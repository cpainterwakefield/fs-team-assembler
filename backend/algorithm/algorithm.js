/**
 * algorithm.js
 * 
 * Contains the representation of each project and person object for the algorithm.
 * Since we'll be returning our results in JSON, those results may be modeled here.
 * 
 * @author Jeremiah Navarro
 * @author Jo Westarp
 * @author Miles Claver
 */

var _ = require('lodash');

const scoring = require('./scoring');
const seeding = require('./seeding');
const dbInt = require('./db_interactions');
const verifiers = require('./tests/verifiers');

// GP Parameters:
// The amount of entropy in repopulation.
const ENTROPY = 10;

// The amount of entropy in mutation.
const MUTATION_ENTROPY = 2;

// The chance that mutation will occur.
const MUTATION_RATE = 0.1;

// The seed value offset for mutation to allow for added randomness.
// If one is getting poor results from using this program, it may help to
// change this seed.
const MUTATION_SEED_OFFSET = 1337;

/**
 * Selects the fittest individual from a generation.
 * 
 * Each individual is scored using function `scoreAllProjects()`; whichever
 * project that ends up having the highest score via this function is selected. 
 * 
 * @param {List of project lists} generation 
 * @return {One set of projects}
 */
function generationSelection(generation) {
    let fittest = 0;
    let fitProject;

    for (let projectList of generation) {
        if (scoring.scoreAllProjects(projectList) > fittest) {
            //If current is greater than the current fittest, make that the fittest 
            fittest = scoring.scoreAllProjects(projectList);
            fitProject = projectList;
        }
    }

    // console.log(fitProject);
    return _.cloneDeep(fitProject);
}

/**
 * Generates a new list of individuals (generation) from a particularly fit individual.
 * 
 * There's very little need to "breed" two individuals together in our context due to the
 * induced coupling between students and projects. Thus we create new individuals by
 * randomly exchanging students between projects from the fittest individual.
 * 
 * Note: numRepeats is also the resultant generation size.
 *  
 * @param {Project list to create a new generation out of.} fittestProjectList 
 * @param {Amount of times to repeat generation.} numRepeats
 * @param {The amount of entropy the regeneration has.} entropy
 * @return {The new generation, a list of individuals.}
 */
function generateFromFittest(fittestProjectList, numRepeats, entropy = ENTROPY) {
    //Create an empty generation to fill and return
    let generation = [];

    // Repeat numRepeats times
    // Indices start at 1 to prevent uniformity in seeded randoms when i = 0.
    for (let i = 0; i < numRepeats; i++) {
        // Clone fittest project list so that we're not editing the original
        let currentFittest = _.cloneDeep(fittestProjectList);

        // For each of these loops, swap random students between groups.
        // The amount of entropy is how many times students are swapped.
        // Higher entropy gives longer runtime, but larger chance for positive
        // variation between generations.
        for (let ent = 1; ent <= entropy; ent++) {
            // Getting seeded random project indices to swap students from 
            let projIndex1 = Math.floor(seeding.seededRandom(ent * i * 2) * (currentFittest.length));
            let projIndex2 = Math.floor(seeding.seededRandom(ent * i * 3) * (currentFittest.length));

            // Getting seeded random student to swap
            let studentIndex1 = Math.floor(seeding.seededRandom(ent * i * 4)
                * (currentFittest[projIndex1].people.length));

            let studentIndex2 = Math.floor(seeding.seededRandom(ent * i * 5)
                * (currentFittest[projIndex2].people.length));

            // Choosing two random students from each randomly chosen project to switch
            let student1 = currentFittest[projIndex1].people[studentIndex1];
            let student2 = currentFittest[projIndex2].people[studentIndex2];

            // Swapping students
            let temp = _.cloneDeep(student1);
            currentFittest[projIndex1].people[studentIndex1] = _.cloneDeep(student2);
            currentFittest[projIndex2].people[studentIndex2] = temp;
        }

        // Adding newly created project list to new generation
        generation.push(currentFittest);

        // Debug: Show variety in scores
        // console.log(scoring.scoreAllProjects(currentFittest));
    }

    // console.log(generation[0]);
    return generation;
}

function mutateGeneration(oldGeneration, entropy = MUTATION_ENTROPY) {
    let generation = _.cloneDeep(oldGeneration);

    // For each individual in the generation, mutate it.
    for (let indIndex = 0; indIndex < generation.length; indIndex++) {
        for (let ent = 1; ent < entropy; ent++) {
            // If random is lower than the mutation rate, then do a mutation.
            // We don't want this to be synced to seededRandom here.
            if (Math.random() < MUTATION_RATE) {
                let individual = generation[indIndex];

                let projIndex1 = Math.floor(seeding.seededRandom(
                    (indIndex + 1) * MUTATION_SEED_OFFSET * ent * 2
                ) * individual.length);

                let projIndex2 = Math.floor(seeding.seededRandom(
                    (indIndex + 1) * MUTATION_SEED_OFFSET * ent * 3
                ) * individual.length);

                let studentIndex1 = Math.floor(seeding.seededRandom(
                    (indIndex + 1) * MUTATION_SEED_OFFSET * ent * 4
                ) * individual[projIndex1].people.length);

                let studentIndex2 = Math.floor(seeding.seededRandom(
                    (indIndex + 1) * MUTATION_SEED_OFFSET * ent * 5
                ) * individual[projIndex2].people.length);

                // Get the random students.
                let student1 = individual[projIndex1].people[studentIndex1];
                let student2 = individual[projIndex2].people[studentIndex2];

                // Swap the students.
                let temp = _.cloneDeep(student1);
                individual[projIndex1].people[studentIndex1] = _.cloneDeep(student2);
                individual[projIndex2].people[studentIndex2] = temp;
            }
        }
    }

    return generation;
}

/**
 * The heart of the genetic algorithm.
 * 
 * To make reading this function easier, it helps to understand the map between GP nomenclature and
 * team-selection nomenclature. In our case, we are looking to find a list of projects that satisfy
 * all constraints specified, while generating the largest possible score for our scoring function.
 * 
 *  - A "population" in this context is a list of individuals.
 *  - An "individual" in this context is a list of projects, with students assigned to each.
 *      - Note that projects hold students in an array, and those students are swapped in evolution.
 *  - A "project" is a single project, which holds a list of students. In initial seeding, these students
 *    may not prefer these projects whatsoever (though greedySeedInitial should prevent these conflicts).
 *      - Projects, of course, hold the `maxStudents`, `minStudents` and `name` fields, etc.
 *  - A "student" is a single student, which may hold a list of student or project *names* to prefer or
 *    avoid, in the case of students only. Note that these are *names* and not actual project nor student
 *    objects. This prevents circular references and the like.
 * 
 * That said, this function utilizes each of these components to eventually arrive at an optimal population.
 * Since this algorithm is genetic, it follows the following process:
 * 
 *  1. Create an initial population via function `greedySeedInitial()`.
 *  2. For each generation of the algorithm,
 *      a. Select the highest scoring individual.
 *      b. Randomly swap students between projects in the highest scoring individual, and
 *         then insert those into the new generation until that generation is full.
 *      c. "Mutate" some individuals by randomly moving around students in the new generation.
 *  3. Once we see little demonstrable change in the top scoring individual, return the top scoring individual.
 *     a. (This could mean that the score is sufficiently high, say, above 100, and hasn't changed by 1).
 *  
 * This algorithm should be sufficient to generate a high-scoring set of teams. Even if the result is not
 * perfect, a site admin has privileges to make sure that all the teams are ideal.
 * 
 * That said, the scoring function may need to be tweaked to adequately provide scoring against avoids
 * and for prefers. As of (6/8/20), scoring only has negative scoring for failed constraints.
 * 
 * @param {The population to be evolved.} population 
 */
function evolvePopulation(population) {
    let selected = generationSelection(population);
    let generation = generateFromFittest(selected, 100, 20);

    // Generation is passed by reference, should just edit it
    let mutated = mutateGeneration(generation);

    return mutated;
}

/**
 * This is where the algorithm will start executing. 
 * It will gather the information from the database here, and store them into the greedy seed function 
 * to create an initial population. 
 * 
 * This algorithm will run and evolve several times, creating new generations more fit than the last. 
 * To keep the algorithm from running endlessly, there are two 'caps' set to control the length of run time:
 *  1.  A set amount to keep the loop running, for example, 100 times before it stops and takes the most
 *      fit individual at that current population
 *  2.  A 'difference threshold' to track the change in between the most fit individual in adjacent populations. 
 *  
 *  These values can be altered to produce a potential more fit result, however, at the cost of run time.  
 */
async function runGeneticAlgorithm() {
    let testData = await dbInt.loadAndConvert();
    let students = testData.students;
    let projects = testData.projects;

    if (students == undefined || projects == undefined) {
        return;
    }

    // Making initial greedy generation
    let generation = seeding.greedySeedInitial(students, projects, 100);
    console.log(scoring.scoreAllProjects(generationSelection(generation)));

    let newGeneration;
    // Set a max amount to stop at if it never reaches the threshold for stopping.
    let maxEvolveTimes = 100;
    const DIFFERENCE_THRESHOLD = 1.1;

    for (i = 0; i < maxEvolveTimes; i++) {
        newGeneration = _.cloneDeep(generation);
        newGeneration = evolvePopulation(newGeneration);

        generation = newGeneration;
    }

    // Select the fittest individual of the final generation.
    let endIndividual = generationSelection(newGeneration);

    // Update the students table in the DB.
    dbInt.updateStudents(endIndividual);

    console.log(verifiers.noAvoidsOnSameProject(endIndividual));
    console.log(verifiers.everyStudentAssignedOnce(students, endIndividual));

    return endIndividual;
}

exports.generationSelection = generationSelection;
exports.generateFromFittest = generateFromFittest;
exports.evolvePopulation = evolvePopulation;
exports.runGeneticAlgorithm = runGeneticAlgorithm;
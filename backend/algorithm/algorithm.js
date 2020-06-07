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

    console.log(fitProject);
    return _.cloneDeep(fitProject);
}

/**
 * Generates a new list of individuals (generation) from a particularly fit individual.
 * 
 * There's very little need to "breed" two individuals together in our context due to the
 * induced coupling between students and projects. Thus we create new individuals by
 * randomly exchanging students between projects from the fittest individual.
 *  
 * @param {Project list to create a new generation out of.} fittestProjectList 
 * @param {Amount of times to repeat generation.} numRepeats
 * @return {The new generation, a list of individuals.}
 */
function generateFromFittest(fittestProjectList, numRepeats) {
    //Create an empty generation to fill and return
    let generation = [];
    let student1;
    let student2;
    let projIndex1;
    let projIndex2;
    let temp;

    // Repeat numRepeats times
    for(let i = 0; i < numRepeats; i++) {
        // Clone fittest project list so that we're not editing the original
        let currentFittest = _.cloneDeep(fittestProjectList);

        // Getting seeded random project indices to swap students from 
        projIndex1 = Math.floor(seeding.seededRandom(i*2) * (currentFittest.length - 1));
        projIndex2 = Math.floor(seeding.seededRandom(i*3) * (currentFittest.length - 1));

        // Choosing two random students from each randomly chosen project to switch
        student1 = currentFittest[projIndex1].people[Math.floor(
            seeding.seededRandom(i*4) * (currentFittest[projIndex1].people.length))];
        student2 = currentFittest[projIndex2].people[Math.floor(
            seeding.seededRandom(i*5) * (currentFittest[projIndex2].people.length))];

        // Swapping students
        temp = student1;
        student1 = student2;
        student2 = temp;

        // Adding newly created project list to new generation
        generation.push(currentFittest);
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
 * and for prefers. As of (6/1/2020), scoring returns undefined if constraints aren't met, which may
 * prove to be unrealistic.
 * 
 * @param {The population to be evolved.} population 
 */
function evolvePopulation(population) {
    return generateFromFittest(generationSelection(population), 100);
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

    //Making initial greedy generation
    let generation = seeding.greedySeedInitial(students, projects, 100);
    let newGeneration;
    // Set a max amount to stop at if it never reaches the threshold for stopping.
    let maxEvolveTimes = 100;
    const DIFFERENCE_THRESHOLD = 1.1;

    for (i = 0; i < maxEvolveTimes; i++) {
        newGeneration = evolvePopulation(generation);

        // Debug: print score of generation
        // console.log(scoring.scoreAllProjects(newGeneration));

        // If it reaches a point where there is not much difference in highest fit individuals, return.
        if (Math.abs(scoring.scoreAllProjects(generationSelection(newGeneration)) -
            scoring.scoreAllProjects(generationSelection(generation))) < DIFFERENCE_THRESHOLD) {
            return generationSelection(newGeneration);
        }
        else {
            generation = newGeneration;
        }
    }

    return generationSelection(newGeneration);
}

exports.generationSelection = generationSelection;
exports.generateFromFittest = generateFromFittest;
exports.evolvePopulation = evolvePopulation;
exports.runGeneticAlgorithm = runGeneticAlgorithm;
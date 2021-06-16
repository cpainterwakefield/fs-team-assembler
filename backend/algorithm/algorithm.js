/**
 * algorithm.js
 *
 * Implements a genetic algorithm for optimizing student team assignments according to their
 * stated preferences.
 *
 * @author Jeremiah Navarro
 * @author Jo Westarp
 * @author Miles Claver
 * @author C. Painter-Wakefield
 */
const _ = require('lodash');

const scoring = require('./scoring');
const seeding = require('./seeding');
const dbInt = require('./db_interactions');
const verifiers = require('./tests/verifiers');

/* Future work:
 * It would be valuable to keep a history of how each individual was produced (greedy
 * improvement, random mutation, etc.), to see which steps we are taking actually contribute
 * the most to the fittest individuals at the end.
 */

/*
 * GP parameters - these can be tweaked to modify the performance of the genetic
 * algorithm.
 */

// The size of each generation, in individuals.  This is somewhat limited by memory on
// the host machine.  Higher is somewhat desirable, although too high a value may result
// in slower evolution.
const POPULATION_SIZE=10000

// A factor to multiply by POPULATION_SIZE to determine how many individuals from the
// previous generation to keep into the next generation.  Increasing this may help
// retain more variety in the fittest population, however, it may slow convergence.
const FITTEST_GROUP_PROPORTION=0.1

/*
 * Mutation parameters: In general, increasing these increases the frequency and number of
 * mutations used in producing new individuals.  A higher mutation rate may increase
 * the chances of finding an optimal individual, but may slow convergence.  If the
 * mutations are too frequent, then later generations will struggle to produce fit
 * offspring.
 */

// The amount of entropy in re-population.  This is the number of times we'll provide
// an opportunity for mutation to occur (with probability given by the MUTATION_RATE).
const ENTROPY = 20;

// The chance that mutation will occur.
const MUTATION_RATE = 0.1;

/**
 * Very nice implementation of Fisher-Yates shuffle from
 * https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
 *
 * @param {Array<*>} arr Array to be shuffled in place
 */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Selects the fittest individual from a generation.
 * 
 * Each individual is scored using function `scoreAllProjects()`; whichever
 * project that ends up having the highest score via this function is selected. 
 * 
 * @param {Array<Array<Object>>} generation List of project lists
 * @return {Array<Object>} One set of projects
 */
function generationSelection(generation) {
    let fittest = 0;
    let fitProject = generation[0];

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
 * Creates new individuals from the fittest individuals in the last generation by attempting
 * to greedily improve the situation for unhappy students.  This can be considered a type
 * of hill-climbing.  This will only be applied to create 10% of the next population.
 *
 * @param {Array<Array<Object>>} population List of project lists (individuals) to create a new generation out of
 * @return {Array<Array<Object>>} The input list, enhanced with (possibly) greedily improved individuals
 */
function greedilyImprovePopulation(population) {
    // only want a modest number of these - 0.1 probably shouldn't be hard-coded, but hard to
    // know how to compute it relative to FITTEST_GROUP_PROPORTION
    let increase = POPULATION_SIZE * 0.1;

    for (let i = 0; i < increase; i++) {
        let change_made = false;

        // randomly select a previously fit individual
        let individual = _.cloneDeep(
            population[Math.floor(Math.random() * FITTEST_GROUP_PROPORTION * POPULATION_SIZE)]
        );

        // get a list of all the students and shuffle them - this means we'll address unhappiness
        // for each student using a different first student, second student, etc. each time
        let allStudents = [];
        for (let proj of individual) {
            for (let student of proj.people) {
                allStudents.push({ student: student, project: proj});
            }
        }
        shuffleArray(allStudents);

        // For each student: if unhappy, try to find a not-full team where we could move the
        // student to improve their happiness.  Only if at least one student switches teams
        // will we add the modified individual to the next generation.
        for (let entry of allStudents) {
            let student = entry.student;
            let project = entry.project;
            let score = scoring.scorePerson(student, project);
            if (score <= 0) {
                if ((student.prefersTeam === true || student.prefersTeam === null)
                    && student.personPreferences.length > 0) {
                    let preferredTeam = allStudents.filter(e => student.personPreferences.includes(e.student.id));
                    for (let other of preferredTeam) {
                        if (other.project.people.length < other.project.maxPeople) {
                            other.project.people.push(student);
                            project.people.splice(project.people.findIndex(s => s.id === student.id), 1);
                            change_made = true;
                            break;
                        }
                    }
                }
                else if ((student.prefersTeam === false || student.prefersTeam === null)
                         && student.projectPreferences.length > 0) {
                    for (let pid of student.projectPreferences) {
                        if (pid) {
                            let newProj = individual.find(p => p.id === pid);
                            if (newProj.people.length < newProj.maxPeople) {
                                newProj.people.push(student);
                                project.people.splice(project.people.findIndex(s => s.id === student.id), 1);
                                change_made = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (change_made) population.push(individual);
    }
}

/**
 * Generates a new list of individuals (generation) from a selection of fittest individuals
 * from the previous generation.  This adds to individuals created using the greedy improvement
 * function above (but only uses the fittest individuals from the previous step), increasing
 * the generation to the desired POPULATION_SIZE.
 *
 * There's very little need to "breed" two individuals together in our context due to the
 * induced coupling between students and projects. Thus we create new individuals by
 * randomly exchanging students between projects within some fit individual from the last
 * generation.
 *
 * @param {Array<Array<Object>>} population List of project lists (individuals) to create a new generation out of
 * @return {Array<Array<Object>>} The input list, expanded with randomly mutated individuals
 */
function mutatePopulation(population) {
    while (population.length < POPULATION_SIZE) {
        let individual = _.cloneDeep(
            population[Math.floor(Math.random() * FITTEST_GROUP_PROPORTION * POPULATION_SIZE)]
        );
        for (let ent = 1; ent < ENTROPY; ent++) {
            // If random is lower than the mutation rate, then do a mutation.
            if (Math.random() < MUTATION_RATE) {
                // Pick a random project
                let projIndex1 = Math.floor(Math.random() * individual.length);
                let proj1 = individual[projIndex1];

                // If a project is empty, push random students onto the project until it is partially full;
                // this is not strictly part of the genetic algorithm, just a way to ensure each project
                // gets a chance to have a team.  If we do this step, we don't do the mutation step.
                // This could probably be done in a more principled (greedy) fashion.
                if (proj1.people.length === 0) {
                    for (let i = 0; i < (proj1.minPeople + proj1.maxPeople) / 2.0; i++) {
                        let tempIndex = Math.floor(Math.random() * individual.length);
                        let tempProj = individual[tempIndex];
                        if (tempProj.people.length > 0) {
                            let pIndex = Math.floor(Math.random() * tempProj.people.length);
                            let p = _.cloneDeep(tempProj.people[pIndex]);
                            proj1.people.push(p);
                            tempProj.people.splice(pIndex, 1);
                        }
                    }
                    continue;
                }

                // Pick a second random project to swap an individual with.  If that project is empty,
                // do the same as above.
                let projIndex2 = Math.floor(Math.random() * individual.length);
                let proj2 = individual[projIndex2];
                if (proj2.people.length === 0) {
                    for (let i = 0; i < (proj2.minPeople + proj2.maxPeople) / 2.0; i++) {
                        let tempIndex = Math.floor(Math.random() * individual.length);
                        let tempProj = individual[tempIndex];
                        if (tempProj.people.length > 0) {
                            let pIndex = Math.floor(Math.random() * tempProj.people.length);
                            let p = _.cloneDeep(tempProj.people[pIndex]);
                            proj2.people.push(p);
                            tempProj.people.splice(pIndex, 1);
                        }
                    }
                    continue;
                }

                // otherwise, swap two students
                let studentIndex1 = Math.floor(Math.random() * proj1.people.length);
                let studentIndex2 = Math.floor(Math.random() * proj2.people.length);
                let student1 = proj1.people[studentIndex1];
                let student2 = proj2.people[studentIndex2];

                // Swap the students.
                let temp = _.cloneDeep(student1);
                proj1.people[studentIndex1] = _.cloneDeep(student2);
                proj2.people[studentIndex2] = temp;
            }
        }
        population.push(individual);
    }

    return population;
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
 *    may not prefer these projects whatsoever.
 *      - Projects, of course, hold the `maxStudents`, `minStudents` and `name` fields, etc.
 *  - A "student" is a single student, which may hold a list of student or project *names* to prefer or
 *    avoid, in the case of students only. Note that these are *names* and not actual project nor student
 *    objects. This prevents circular references and the like.
 * 
 * That said, this function utilizes each of these components to eventually arrive at an optimal population.
 * Since this algorithm is (partially) genetic, it follows the following process:
 * 
 *  1. Create an initial population via function `greedySeedInitial()`.
 *  2. For each generation of the algorithm,
 *      a. Sort the individuals by score (fitness), and select a percentage of the highest scorers.
 *      b. Do some greedy improvements on individuals by attempting to improve the situation of
 *         unhappy students in some high scoring individual.
 *      c. Randomly swap students between projects in some high scoring individual, and
 *         then insert those into the new generation until that generation is full.
 *
 * @param {Array<Array<Object>>} population The population to be evolved
 * @return {Array<Array<Object>>} The evolved population
 */
function evolvePopulation(population) {
    // sort all project lists by score
    population.sort((a, b) => scoring.scoreAllProjects(b) - scoring.scoreAllProjects(a));

    // improve on the top 10%
    population = population.slice(0, Math.floor(0.1*population.length));

    greedilyImprovePopulation(population);
    mutatePopulation(population);

    return population;
}

/**
 * This is where the algorithm will start executing. 
 * It will gather the information from the database here, and store them into the greedy seed function 
 * to create an initial population. 
 * 
 * This algorithm will run and evolve several times, creating new generations more fit than the last. 
 * To keep the algorithm from running endlessly, there are two 'caps' set to control the length of run time:
 *  1.  A set amount to keep the loop running, for example, 500 times before it stops and takes the most
 *      fit individual at that current population
 *  2.  A 'difference threshold' to track the change in between the most fit individual in adjacent populations. 
 *  
 *  These values can be altered to produce a potential more fit result, however, at the cost of run time.
 *
 * @param {boolean} greedyOnly Flag to disable genetic algorithm
 */
async function runGeneticAlgorithm(greedyOnly=false) {
    let testData = await dbInt.loadAndConvert();
    let students = testData.students;
    let projects = testData.projects;

    // If the DB is empty, the algorithm shouldn't be able to run.
    if (students == undefined || projects == undefined) {
        return;
    }

    // If there are fewer students than can be on any project, the
    // algorithm shouldn't be able to run.
    if (students.length < 2) {
        return;
    }

    // Making initial greedy generation
    let generation = seeding.greedySeedInitial(students, projects, POPULATION_SIZE);

    let fittestScore = scoring.scoreAllProjects(generationSelection(generation));

    if (!greedyOnly) {
        let initialScore = scoring.scoreAllProjects(generationSelection(generation));
        console.log(`Score before genetic algorithm: ${initialScore}`);

        // Set a max amount to stop at if it never reaches the threshold for stopping.
        let maxEvolveTimes = 500;
        let retryTimes = 8; // makes up for smaller generation sizes due to memory constraints
        const DIFFERENCE_THRESHOLD = 1;

        for (let i = 0; i < maxEvolveTimes; i++) {
            //newGeneration = _.cloneDeep(generation);
            generation = evolvePopulation(generation);
            let newFittestScore = scoring.scoreAllProjects(generationSelection(generation));
            console.log(`Generation ${i} score: ${newFittestScore}`);

            if ((newFittestScore - fittestScore) < DIFFERENCE_THRESHOLD) {
                retryTimes--
            } else {
                retryTimes = 8;
            }
            if (retryTimes === 0) break;

            //generation = newGeneration;
            fittestScore = newFittestScore;
        }

        // Select the fittest individual of the final generation.
        let endIndividual = generationSelection(generation);

        // Update the students table in the DB.
        dbInt.updateStudents(endIndividual);

        console.log("Scoring final project list...");
        let finalScore = scoring.scoreAllProjects(endIndividual);
        console.log(`Score after genetic algorithm: ${finalScore}`);

        verifiers.noAvoidsOnSameProject(endIndividual);
        verifiers.everyStudentAssignedOnce(students, endIndividual);

        return { score: finalScore }
        //return endIndividual;
    } else {
        return _.cloneDeep(generationSelection(generation));
    }
}

exports.runGeneticAlgorithm = runGeneticAlgorithm;
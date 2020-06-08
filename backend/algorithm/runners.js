/**
 * runners.js
 * 
 * Contains the functions for running the algorithm.
 * Some of these runners do not involve full utilization of the algorithm;
 * they are mainly for testing.
 * 
 * @author Jeremiah Navarro
 * @author Miles Claver
 */

const dbInt = require('./db_interactions');
const seeding = require('./seeding');
const scoring = require('./scoring');
const algorithm = require('./algorithm');

// The amount of individuals the greedy seed creates initially.
const GREEDY_POPULATION_NUM = 100;

/**
 * A function stub (somewhat) for running the greedy algorithm exclusively.
 * 
 * Note that this function does not run the genetic part, purposefully so.
 * This is in case the genetic algorithm is unable to generate an adequate solution
 * in reasonable time.
 * 
 * That said, the genetic algorithm has been tested and it appears that it runs in
 * good time, so this function will likely be unnecessary.
 */
async function convertAndRunGreedy() {
    let algoJSON = await dbInt.loadAndConvert();
    let students = algoJSON.students;
    let projects = algoJSON.projects;

    // Run the greedy algorithm on students/projects for
    // GREEDY_POPULATION_NUM times, then return the result.
    let greedyResult = seeding.greedySeedInitial(students,
        projects, GREEDY_POPULATION_NUM);
    
    let highestScoringList = greedyResult[0];

    for (let individual of greedyResult) {
        // If the current individual has a higher score than
        // the other list, then update the highest scoring list.
        if (scoring.scoreAllProjects(individual)
            > scoring.scoreAllProjects(highestScoringList)) {
                highestScoringList = individual;
        }
    }

    // Updates the students table with the highest scoring project list.
    dbInt.updateStudents(highestScoringList);
}

/**
 * Runs the genetic algorithm.
 * 
 * See 'runGeneticAlgorithm()' in './algorithm'. Effectively, that function
 * converts the DB response and uses the students in the DB to generate a team
 * based on student preferences.
 * 
 * Once it creates those teams, it posts the updated students to the DB.
 */
async function runGP() {
    algorithm.runGeneticAlgorithm();
}

exports.convertAndRunGreedy = convertAndRunGreedy;
exports.runGP = runGP;
/*
 * algorithm.js
 * 
 * Contains the representation of each project and person object for the algorithm.
 * Since we'll be returning our results in JSON, those results may be modeled here.
 */

const students = require('../models/student.model');
const projects = require('../models/project.model');

function getAllStudents() {
    let allStudentsJSON;

    students.findAll().then((studentExists) => {
        if (studentExists) {
            allStudentsJSON;
            console.log(studentExists);
        } else {
            // No students are in the DB :(
            console.log("No students in the DB");
        }
    });

    return allStudentsJSON;
}

function getAllProjects() {
    let allProjectsJSON;

    projects.findAll().then((projectExists) => {
        if (projectExists) {
            allProjectsJSON = projectExists;
            console.log(projectExists);
        } else {
            // No projects are in the DB :(
            console.log("No projects in the DB");
        }
    });

    return allProjectsJSON;
}

/**
 * Creates a random number between 0 and 1 using a seed.
 * 
 * This is the "Mulberry32" PRNG, and it has a period of about 2**32.
 * It's good for our case because we only need a very small period (~1000), and Mulberry32
 * is extremely fast (so it's good for this purpose).
 * 
 * Sources:
 *  - https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript (bryc's answer)
 *  - https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 * @param {The seed to create a random number with.} seed 
 */
function seededRandom(seed) {
    seed += 0x6D2B79F5;

    let t = seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4_294_967_296;
}

/**
 * Seeds an initial population to use for generation.
 * 
 * Takes a list of students, and for populationSize iterations:
 *  - (1) Picks a random student from the list, and puts them in their top preferred project.
 *      - If they have no project preferences, then they are put on a random project.
 *      - Once selected, do not select that student again. (Since lists are by reference in JS),
 *          (this means either cloning the students object or some other methodology; I recommend)
 *          (an array of booleans the same length as the students array).
 *  - Then, keep picking students until each student has been sorted into a project. This list of fulfilled
 *      projects constitutes an "individual" in our GA.
 *  - Add the individual to a list of individuals, and re-seed the RNG. (This guarantees genetic variety)
 *      (in each of our individuals). After that, jump back to (1).
 * 
 * By doing the process outlined above, this will generate populationSize individuals to run a genetic algorithm
 * against. Each individual is scored via the `scoreProject(project)` function outlined in this file.
 * 
 * This function does *not* handle the genetic algorithm, just the initial seed. That said, we need to guarantee
 * randomness between individuals to make sure that this function is effective. Random indices may be produced
 * with the `seededRandom(seed)` function provided in this file. It gives a pseudorandom number based on the
 * numeric seed provided as a parameter.
 * @param {The list of all students with preferences etc. fulfilled.} students
 * @param {The list of all possible projects (uninitialized).} projects 
 * @param {The population size to be seeded.} populationSize
 * @return {The initial generation, as a list of project JSON objects.}
 */
function greedySeedInitial(students, projects, populationSize) {
    // List of sets of projects
    let projectPopulation = [];
    // Loop for creating each set of projects.
    for (let i = 0; i < populationSize; i++) {
        // Index should be different for each iteration, so we seed with index
        let studentIndex = Math.floor(seededRandom(i) * students.length);

        // List of projects
        let projectList = [];
        let selected = new Array(students.length).fill(false);

        // Tracker variables for random population generation
        let numSelected = 0;
        let studentSeed = 0;

        // For each student, add random student to proper project
        while (numSelected < students.length) {
            // Gets a random student index from the students array
            studentIndex = Math.floor(seededRandom(studentSeed) * students.length);

            if (students[studentIndex].projectPreferences.length == 0 && selected[studentIndex] == false) {
                let projectIndex = Math.floor(seededRandom((i + 1) * (j + 1)) * projects.length);
                selected[studentIndex] = true;
                projects[projectIndex].people.push(students[studentIndex]);

                // Add project to project list if full
                if (projects[projectIndex].people.length == projects[projectIndex].maxPeople){
                    projectList.push(projects[projectIndex]);
                }
                
                // Increment the number of students selected
                numSelected++;
            } // Add student to preferred project
            else if (students[studentIndex].projectPreferences.length != 0 && selected[studentIndex] == false) {
                for (var k = 0; k < students[studentIndex].length; k++) {
                    for (var l = 0; l < projects.length; l++) {
                        if (projects[l].projectName == initialStudent.projectPreferences[k]) {
                            //If project is full, do nothing and increment to next project preference 
                            if (projects[l].people.length < projects[l].maxPeople) {
                                break;
                            }
                            else {
                                projects[l].people.push(initialStudent);
                                selected[l] = true;
                                //Add project to project list if full
                                if(projects[l].people.length == projects[l].maxPeople){
                                    projectList.push(projects[l]);
                                }
                            }
                        }
                    }
                }
                if(selected[l] == false){
                    projectIndex = seededRandom(projects.length);
                    selected[studentIndex] = true;
                    projects[projectIndex].people.push(students[studentIndex]); 
                    // Add project to project list if full
                    if(projects[projectIndex].people.length == projects[projectIndex].maxPeople){
                        projectList.push(projects[projectIndex]);
                    }
                }
            }

            studentSeed++;
        }

        // Add project list to projectPopulation
        projectPopulation.push(projectList);
    }
    
    // Return the populated population
    return projectPopulation;
}



/** 
 * A function that checks project preferences on a person basis,
 * with respect to `project`.
 * 
 * The `person` can be any person object, and `teamPrefOffset`
 * determines the offset of the score depending on this function's use.
 */
function scoreProjectPreferences(project, person, teamPrefOffset) {
    // The total for checking project preferences.
    let localTotal = 0;

    // Checks whether preferences are satisfied for the `person`.
    let satisfied = false;

    person.projectPreferences.forEach(function (entry, index) {
        if (entry == project.projectName && !satisfied) {
            localTotal += (teamPrefOffset - index);
            satisfied = true;
        }
    });

    if (!satisfied) {
        return undefined;
    }

    return localTotal;
};

/** 
 * A function that checks person preferences on a person basis,
 * with respect to `project`.
 * 
 * The `person` can be any person object, and `teamPrefValue`
 * determines how much to add to the total depending on the function use.
 */
function scorePersonPreferences(project, person, teamPrefValue) {
    let localTotal = 0;
    let satisfied = false;

    // For each preferred person,
    person.personPreferences.forEach(function (entry) {
        // Check whether they're in the project's people list.
        project.people.forEach(function (pEntry) {
            if (entry == pEntry.name) {
                // If they are, add teamPrefValue to the total for every
                // extra person is in the project list.
                localTotal += satisfied ? teamPrefValue : 0;
                satisfied = true;
            }
        });
    });

    // For each avoided person,
    person.personAvoidances.forEach(function (entry) {
        // If this team has anyone whom they chose to avoid, then the constraint is not
        // met, hence this returns undefined.
        project.people.forEach(function (pEntry) {
            if (entry == pEntry.name) {
                satisfied = false;
            }
        });
    });

    // If the constraint has not been satisfied, return undefined
    if (!satisfied) {
        return undefined;
    }

    return localTotal;
};

/**
 * Scores a project based on student and project satisfaction.
 * 
 * The initial metric for scoring each project was specified on May 22nd in a client email.
 * Each project must meet the following constraints:
 *  - If a person specifies a "teammate" preference, they must have a team member from their preferences list.
 *  - If a person specifies a "project" preference, they must have a project from their preferences list.
 *  - If a person has no preference, then they need to have one or the other.
 *  - Each project must have a number of team members between the minimum and maximum.
 *  - Nobody can be on a team with members whom they chose to avoid.
 * If any of these constraints are not met, this function returns undefined (as the project cannot be scored;
 * it cannot exist in the solution space).
 * 
 * Otherwise, if the constraints are met, this project returns a score, as an integer, which indicates
 * the fitness of the project. This score is calculated given the following metric:
 *  - Each person who preferred teammates gets +2 for each team member beyond the first that is on their team.
 *  - Each person who preferred teammates gets +1, 2 or 3 if they are on their third, second or first pick for teams, respectively.
 *  - Each person who preferred projects gets +2 if on third pick, +3 if on their second pick, or +4 on their first.
 *  - Each person who preferred projects gets +1 for each team member they preferred.
 *  - Each person who said "either" should:
 *      - If they are on any project that they prefer, +1 for any team members they preferred, and +1 or +2 for being on second/first choice.
 *      - If they are not on any project that they prefer, +1 for each team member beyond the first.
 * @param {The project to be scored.} project 
 */
function scoreProject(project) {
    let total = 0;

    // If the amount of people on the project isn't within the
    // range requested for the project, then the project doesn't meet the constraint.
    if (project.people.length < project.minPeople
        || project.people.length > project.maxPeople) {
        return undefined;
    }

    for (let person of project.people) {
        if (person.prefersTeam == null) {
            // Total the project preference scores for the person
            // with an offset of 2 (for team scoring points).
            let projectPrefTotal = scoreProjectPreferences(project, person, 2);
            let personPrefTotal = undefined;

            // If the project preference total is undefined, no
            // constraints were met. Check person preferences to make sure
            // that at least those were met.
            if (projectPrefTotal == undefined) {
                personPrefTotal = scorePersonPreferences(project, person, 1);
            }

            // If none of these constraints are satisfied, return
            // undefined to indicate such.
            //
            // Otherwise, return possible totals.
            if (projectPrefTotal == undefined) {
                total += personPrefTotal;
            } else if (personPrefTotal == undefined) {
                total += projectPrefTotal;
            } else {
                return undefined;
            }
        } else if (person.prefersTeam) {
            let personPrefTotal = scorePersonPreferences(project, person, 2);
            let projectPrefTotal = scoreProjectPreferences(project, person, 3);

            // (Explicit undefined checks and returns for clarity)
            if (personPrefTotal == undefined) {
                return undefined;
            } else {
                total += personPrefTotal + projectPrefTotal;
            }
        } else {
            let personPrefTotal = scorePersonPreferences(project, person, 1);
            // Check project preferences with an offset of 4 (for weighted team scoring).
            let projectPrefTotal = scoreProjectPreferences(project, person, 4);

            if (projectPrefTotal == undefined) {
                return undefined;
            } else {
                total += personPrefTotal + projectPrefTotal;
            }
        }
    }

    return total;
}

/**
 * Scores a list of all the projects (with students populated)
 * based on the metric provided by function `scoreProject()`.
 * 
 * Essentially, this function adds the total score together from each project in
 * the array of projects (arg `projects`) and returns that score.
 * 
 * If any of the projects do not meet the constraints for `scoreProject()`, then
 * this function returns undefined. (This may be subject to change later if it
 * ends up being problematic for reasonable scoring). 
 * @param {The array of projects to be scored.} projects 
 */
function scoreAllProjects(projects) {
    let totalScore = 0;

    for (let project of projects) {
        let projectScore = scoreProject(project);

        if (projectScore == undefined) {
            return undefined;
        }

        totalScore += projectScore;
    }

    return totalScore;
}
/**
 * 
 * @param {List of project lists} generation 
 * @return {One set of projects}
 */
function generationSelction(generation) {
    let fittest = 0;
    let fitProject;
    for (let projectList of generation) {
        if (scoreAllProjects(projectList) > fittest) {
             fittest = scoreAllProjects(projectList);
             fitProject = projectList;
        }
    }
    return fitProject;
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
 * @param {The population to be evolved.} population 
 */
function evolvePopulation(population) {

}

/* Exports for testing ONLY: */
exports.scoreProjectPreferences = scoreProjectPreferences;
exports.scorePersonPreferences = scorePersonPreferences;
exports.scoreProject = scoreProject;
exports.scoreAllProjects = scoreAllProjects;
exports.generationSelction = generationSelction;
/**
 * seeding.js
 * 
 * Contains seeding functions for the genetic algorithm.
 * For seeding the initial population, we utilize a greedy algorithm,
 * greedySeedInitial(), which attempts to generate adequate starting
 * project assignments (ideally those with a high score).
 * 
 * @author Jeremiah Navarro
 * @author Miles Claver
 */
var _ = require('lodash');

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
    let projectPopulation = [];

    for (let popIndex = 0; popIndex < populationSize; popIndex++) {
        // We don't want to modify the original students array so we clone it.
        let currentStudents = _.cloneDeep(students);

        // console.log(currentStudents);

        // The index for the initial student being selected from the students list.
        let studentIndex = Math.floor(seededRandom(popIndex));

        // A deep copy of the list of projects for assigning to the project list.
        let currentProjectList = _.cloneDeep(projects);

        // A list of populated projects.
        let popProjectList = [];

        // The seed which picks random students from the array.
        let studentSeed = popIndex;

        while (currentStudents.length > 0) {
            // Get a student from the list of current students.
            let student = currentStudents[studentIndex];

            // Remove student at studentIndex from the currentStudents array
            currentStudents.splice(studentIndex, 1);

            // If the student has no project preferences, then give them
            // the first random project that the PRNG can find.
            if (student.projectPreferences.length == 0 || student.prefersTeam) {
                let satisfied = false;
                for (let projectIndex = 0; projectIndex < currentProjectList.length; projectIndex++) {
                    // If there is an avoid present in the current project,
                    // this is set to true and the loop continues to the next project.
                    let avoidPresent = false;
                    for (let avoid of student.personAvoidances) {
                        // If there is a student that the current student avoids in
                        // the list of people for the project, continue to next project.
                        if (currentProjectList[projectIndex].people.some((e) => { e.id == avoid })) {
                            avoidPresent = true;
                            break;
                        }
                    }

                    // We don't want to put a student in a project with people
                    // who they chose to avoid.
                    if (avoidPresent) { continue; }

                    // If there is a preference in the current project, then put the
                    // student on that project, and break from the loop.
                    let preferencePresent = false;
                    for (let preference of student.personPreferences) {
                        if (currentProjectList[projectIndex].people.some((e) => { e.id == preference })) {
                            preferencePresent = true;
                            currentProjectList.people.push(student);
                            break;
                        }
                    }

                    // If the student is on a project with people they prefer, then
                    // put them in that project, and mark this as satisfied.
                    if (preferencePresent) {
                        if (currentProjectList[projectIndex].people.length
                            == currentProjectList[projectIndex].maxPeople) {
                            
                            popProjectList.push(currentProjectList[projectIndex]);
                            currentProjectList.splice(projectIndex, 1);
                        }

                        satisfied = true;
                        break; 
                    }
                }

                // If the student is not on a project (no preferences were satisfied),
                // put them on a random project.
                if (!satisfied) {
                    // Chooses a random project with sufficient randomness to put
                    // the student on.
                    let projectIndex = Math.floor(
                        seededRandom((studentSeed + 1) * (popIndex + 1))
                        * currentProjectList.length);
                   
                    currentProjectList[projectIndex].people.push(student);

                    if (currentProjectList[projectIndex].people.length
                        == currentProjectList[projectIndex].maxPeople) {
                        
                        popProjectList.push(currentProjectList[projectIndex]);
                        currentProjectList.splice(projectIndex, 1);
                    }
                }
            } else {
                let inProject = false;
                for (let preferredProject of student.projectPreferences) {
                    // Checks if at least some project with the given ID is in the project list.
                    // e.name can be changed to e.id for project IDs.
                    if (currentProjectList.some((e) => e.id == preferredProject)) {
                        // If the project list still has a project that the student
                        // prefers, put them in that project.
                        let projectIndex = currentProjectList.findIndex((e) => e.id == preferredProject);
                        currentProjectList[projectIndex].people.push(student);

                        // If the project is full, then push to project list.
                        if (currentProjectList[projectIndex].people.length
                            == currentProjectList[projectIndex].maxPeople) {
                            
                            popProjectList.push(currentProjectList[projectIndex]);
                            currentProjectList.splice(projectIndex, 1);
                        }

                        // The student is in a project.
                        inProject = true;
                        break;
                    }
                }

                // If the student could not make it into a preferred project,
                // then put them on a random project.
                if (!inProject) {
                    let projectIndex = Math.floor(
                        seededRandom((studentSeed + 1) * (popIndex + 1))
                        * currentProjectList.length);
    
                    // Put the student on the project.
                    currentProjectList[projectIndex].people.push(student);
                        
                    // If the project is full, then push to project list.
                    if (currentProjectList[projectIndex].people.length
                        == currentProjectList[projectIndex].maxPeople) {
                        
                        popProjectList.push(currentProjectList[projectIndex]);
                        currentProjectList.splice(projectIndex, 1);
                    }
                }
            }

            // Add popIndex to student seed to give a more random distribution
            studentSeed += popIndex;

            // Change student index to new value for next iteration
            studentIndex = Math.floor(
                seededRandom(studentSeed) * currentStudents.length);
        }

        // The only projects pushed in currentProjectList are projects
        // that happen to be full. This gets the rest of them to the
        // popProjectList which makes sure that all students are included.
        for (let remainingProject of currentProjectList) {
            // Since we don't need projects with zero members
            // (this is an okay constraint), we only push if
            // there are students in the project.
            // console.log(remainingProject);

            if (remainingProject.people.length > 0) {
                popProjectList.push(remainingProject);
            }
        }

        // Push a project list to the population list.
        projectPopulation.push(popProjectList);
    }

    // Return the list of list of projects.
    return projectPopulation;
}

exports.seededRandom = seededRandom;
exports.greedySeedInitial = greedySeedInitial;
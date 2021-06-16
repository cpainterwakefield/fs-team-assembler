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
 * @author C. Painter-Wakefield
 */

var _ = require('lodash');

/**
 * Seeds an initial population to use for generation.
 * 
 * Takes a list of students, and for populationSize iterations:
 *  - Picks a random student from the list, and puts them in their top preferred project.
 *      - If they have no project preferences, then they are put on a random project.
 *      - Once selected, do not select that student again.
 *  - Then, keep picking students until each student has been sorted into a project. This list of fulfilled
 *      projects constitutes an "individual" in our GA.
 *  - Add the individual to a list of individuals.
 * 
 * By doing the process outlined above, this will generate populationSize individuals to run a genetic algorithm
 * against. Each individual is scored via the `scoreProject(project)` function outlined in this file.
 * 
 * This function does *not* handle the genetic algorithm, just the initial seed.
 *
 * @param {Array<Object>} students The list of all students with preferences etc. fulfilled
 * @param {Array<Object>} projects The list of all possible projects (uninitialized)
 * @param {number} populationSize The population size to be created
 * @return {Array<Object>} The initial generation, as a list of project objects
 */
function greedySeedInitial(students, projects, populationSize) {
    let projectPopulation = [];

    for (let popIndex = 0; popIndex < populationSize; popIndex++) {
        // We don't want to modify the original students array so we clone it.
        let currentStudents = _.cloneDeep(students);

        // A deep copy of the list of projects for assigning to the project list.
        let currentProjectList = _.cloneDeep(projects);

        // A list of populated projects.
        let popProjectList = [];

        while (currentStudents.length > 0) {
            // Get student index for next iteration
            let studentIndex = Math.floor(Math.random() * currentStudents.length);

            // Get a student from the list of current students.
            let student = currentStudents[studentIndex];

            // Remove student at studentIndex from the currentStudents array
            currentStudents.splice(studentIndex, 1);

            // If the student has no project preferences, then give them
            // the first random project that the PRNG can find.
            if (student.projectPreferences.length === 0 || student.prefersTeam) {
                let satisfied = false;

                for (let projectIndex = 0; projectIndex < currentProjectList.length; projectIndex++) {
                    // If there is an avoid present in the current project,
                    // this is set to true and the loop continues to the next project.
                    let avoidPresent = false;
                    for (let avoid of student.personAvoidances) {
                        // If there is a student that the current student avoids in
                        // the list of people for the project, continue to next project.
                        if (currentProjectList[projectIndex].people.some((e) => { e.id === avoid })) {
                            avoidPresent = true;
                            break;
                        }
                    }

                    // We don't want to put a student in a project with people
                    // whom they chose to avoid.
                    if (avoidPresent) { continue; }

                    // If there is a preference in the current project, then put the
                    // student on that project, and break from the loop.
                    let preferencePresent = false;
                    for (let preference of student.personPreferences) {
                        if (currentProjectList[projectIndex].people.some((e) => { e.id === preference })) {
                            preferencePresent = true;
                            currentProjectList.people.push(student);
                            break;
                        }
                    }

                    // If the student is on a project with people they prefer, then
                    // put them in that project, and mark this as satisfied.
                    if (preferencePresent) {
                        if (currentProjectList[projectIndex].people.length
                            === currentProjectList[projectIndex].maxPeople) {
                            
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
                    let projectIndex = Math.floor(Math.random() * currentProjectList.length);
                   
                    currentProjectList[projectIndex].people.push(student);

                    if (currentProjectList[projectIndex].people.length
                        === currentProjectList[projectIndex].maxPeople) {
                        
                        popProjectList.push(currentProjectList[projectIndex]);
                        currentProjectList.splice(projectIndex, 1);
                    }
                }
            } else {
                let inProject = false;
                for (let preferredProject of student.projectPreferences) {
                    // Checks if at least some project with the given ID is in the project list.
                    // e.name can be changed to e.id for project IDs.
                    if (currentProjectList.some((e) => e.id === preferredProject)) {
                        // If the project list still has a project that the student
                        // prefers, put them in that project.
                        let projectIndex = currentProjectList.findIndex((e) => e.id === preferredProject);
                        currentProjectList[projectIndex].people.push(student);

                        // If the project is full, then push to project list.
                        if (currentProjectList[projectIndex].people.length
                            === currentProjectList[projectIndex].maxPeople) {
                            
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
                    let projectIndex = Math.floor(Math.random() * currentProjectList.length);
    
                    // Put the student on the project.
                    currentProjectList[projectIndex].people.push(student);
                        
                    // If the project is full, then push to project list.
                    if (currentProjectList[projectIndex].people.length
                        === currentProjectList[projectIndex].maxPeople) {
                        
                        popProjectList.push(currentProjectList[projectIndex]);
                        currentProjectList.splice(projectIndex, 1);
                    }
                }
            }
        }

        // An array that holds students left over from unfulfilled projects. 
        let leftoverStudents = [];

        // An array that holds left over projects.
        let leftoverProjects = [];

        while (currentProjectList.length > 0) {
            let remProj = currentProjectList.pop();

            // If the project doesn't have enough people, but it has *some*
            // people on it, take these people out of those projects.
            if (remProj.people.length < remProj.minPeople && remProj.people.length > 0) {
                // Push each student into leftover arr
                for (let person of remProj.people) {
                    leftoverStudents.push(person);
                }

                // Clear the people list of the remaining project.
                remProj.people = [];

                // Put the cleared project in a "remaining" pile.
                leftoverProjects.push(remProj);
            } else if (remProj.people.length >= remProj.minPeople) {
                popProjectList.push(remProj);
            } else {
                leftoverProjects.push(remProj);
            }
        }

        while (leftoverProjects.length > 0 && leftoverStudents.length > 0) {
            let leftoverProj = leftoverProjects.pop();

            while (leftoverProj.people.length <= leftoverProj.maxPeople && leftoverStudents.length > 0) {
                let leftover = leftoverStudents.pop();
                leftoverProj.people.push(leftover);
            }

            popProjectList.push(leftoverProj);
        }

        // Push a project list to the population list.
        while (leftoverProjects.length > 0) {
            popProjectList.push(leftoverProjects.pop());
        }

        projectPopulation.push(popProjectList);
    }

    // Return the list of list of projects.
    return projectPopulation;
}

exports.greedySeedInitial = greedySeedInitial;
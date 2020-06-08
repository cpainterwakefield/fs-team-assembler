/**
 * verifiers.js
 * 
 * Contains functions for verifying algorithm correctness.
 * 
 * @author Miles Claver
 */

/**
 * Checks that every student is assigned to a project.
 * 
 * This assumes that no student is assigned to multiple projects (and they shouldn't be).
 * That said, it checks that the total sum of the lengths of the people property on each
 * project object is equal to the number of students.
 * 
 * @param {The list of all students.} students 
 * @param {The list of all projects, with students assigned.} projectList 
 */
function everyStudentAssignedOnce(students, projectList) {
    let projectStudentsSum = 0;
    for (let project of projectList) {
        projectStudentsSum += project.people.length;
    }

    if (projectStudentsSum == students.length) {
        return true;
    } else {
        console.log("Not every student assigned once:");
        console.log(`Students assigned: ${projectStudentsSum}`);
        console.log(`Total students: ${students.length}`);

        return false;
    }
}

function noAvoidsOnSameProject(projectList) {
    // The total amount of avoids, per project.
    let avoidList = [];

    // For each project,
    for (let project of projectList) {
        let numAvoids = 0;

        // Check that each avoider is not on the same project with their avoidee.
        // If they are, increment the amount of avoids per project.
        for (let possibleAvoider of project.people) {
            for (let possibleAvoidee of project.people) {
                for (let avoidID of possibleAvoider.personAvoidances) {
                    if (avoidID == possibleAvoidee.id) {
                        numAvoids++;
                    }
                }
            }
        }

        // Push the amount of avoids recorded per project.
        avoidList.push(numAvoids);
    }

    // Tracker variables for the amount of avoids.
    let areAvoids = false;
    let totalAvoids = 0;

    for (let avoidIndex = 0; avoidIndex < avoidList.length; avoidIndex++) {
        let numAvoids = avoidList[avoidIndex];

        if (numAvoids > 0) {
            console.log(`Avoided student in same project, proj. ID: ${projectList[avoidIndex].id}`);

            totalAvoids += numAvoids;
            areAvoids = true;
        }
    }

    if (areAvoids) {
        console.log(`Total number of avoids: ${totalAvoids}`);
    }

    return !areAvoids;
}

exports.everyStudentAssignedOnce = everyStudentAssignedOnce;
exports.noAvoidsOnSameProject = noAvoidsOnSameProject;
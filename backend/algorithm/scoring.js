/**
 * scoring.js
 * 
 * Contains the scoring functions for the genetic algorithm.
 * Has scoring for individual use cases (student prefers project),
 * (or student prefers teammates).
 * Also has scoring for single and multiple projects.
 * 
 * @author Jeremiah Navarro
 * @author Miles Claver
 */

var _ = require('lodash');

// The penalty to scoring by having a student be placed in a project
// that they do not prefer.
const PROJECT_PENALTY = 5;

// The penalty to scoring incurred by having someone in a group
// with someone whom they chose to avoid.
const AVOID_PENALTY = 7;

// The penalty to scoring incurred by a group not having enough
// members, or having too many members.
const POP_BOUND_PENALTY = 15;

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
        if (entry == project.id && !satisfied) {
            localTotal += (teamPrefOffset - index);
            satisfied = true;
        }
    });

    if (!satisfied) {
        return localTotal - PROJECT_PENALTY;
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
            if (entry == pEntry.id) {
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
            if (entry == pEntry.id) {
                localTotal -= AVOID_PENALTY;
            }
        });
    });

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
        total -= POP_BOUND_PENALTY;
    }

    for (let person of project.people) {
        if (person.prefersTeam == null) {
            // Total the project preference scores for the person
            // with an offset of 2 (for team scoring points).
            let projectPrefTotal = scoreProjectPreferences(project, person, 2);
            let personPrefTotal = undefined;

            // If the project preference total is below 0, no
            // constraints were met. Check person preferences to make sure
            // that at least those were met.
            if (projectPrefTotal <= 0) {
                personPrefTotal = scorePersonPreferences(project, person, 1);
            }

            // Return possible totals.
            if (projectPrefTotal <= 0) {
                total += personPrefTotal;
            } else {
                total += projectPrefTotal;
            }
        } else if (person.prefersTeam) {
            let personPrefTotal = scorePersonPreferences(project, person, 2);
            let projectPrefTotal = scoreProjectPreferences(project, person, 3);

            // (Explicit undefined checks and returns for clarity)
            total += personPrefTotal + projectPrefTotal;
        } else {
            let personPrefTotal = scorePersonPreferences(project, person, 1);
            // Check project preferences with an offset of 4 (for weighted team scoring).
            let projectPrefTotal = scoreProjectPreferences(project, person, 4);

            total += personPrefTotal + projectPrefTotal;
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
    if (projects == undefined) {
        return 0;
    }
    
    let totalScore = 0;

    for (let project of projects) {
        let projectScore = scoreProject(project);
        totalScore += projectScore;
    }

    return totalScore;
}

exports.scoreProjectPreferences = scoreProjectPreferences;
exports.scorePersonPreferences = scorePersonPreferences;
exports.scoreProject = scoreProject;
exports.scoreAllProjects = scoreAllProjects;

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
 * @author C. Painter-Wakefield
 */

// The penalty to scoring by having a student be placed in a project
// that they do not prefer.
const UNSATISFIED_PENALTY = -5;

// The penalty to scoring incurred by having someone in a group
// with someone whom they chose to avoid.
const AVOID_PENALTY = -12;

// The penalty to scoring incurred by a group not having enough
// members, or having too many members.
const TEAM_SIZE_PENALTY = -5;

/**
 * Compute a fitness score for a single person on a project, when that person has a preference
 * for team rather than project.
 *
 * @param {Object} person The person to be scored
 * @param {Object} project The project to be scored
 * @returns {number} The computed score
 */
function scoreForPreferTeam(person, project) {
    let score = 0;

    // +2 for each teammate beyond the first who person prefers
    person.personPreferences.forEach(function (entry) {
        project.people.forEach(function (pEntry) {
            if (entry === pEntry.id) {
                score += 2;
            }
        });
    });

    // if nobody, then person is unsatisfied, unless they didn't give
    // us any teammate preferences
    if (score > 0) score -= 1;
    else if (person.personPreferences.length > 0) score += UNSATISFIED_PENALTY;
    //if (score === 0 && person.personPreferences.length > 0) score += UNSATISFIED_PENALTY;

    // bonus points for also having project preference
    person.projectPreferences.forEach(function (entry, index) {
        if (entry === project.id) {
            score += (4 - index);
        }
    });

    return score;
}

/**
 * Compute a fitness score for a single person on a project, when that person has a preference
 * for project rather than team.
 *
 * @param {Object} person The person to be scored
 * @param {Object} project The project to be scored
 * @returns {number} The computed score
 */
function scoreForPreferProject(person, project) {
    let score = 0;
    let satisfied = false;

    // +2 if on second pick, +4 if on first pick
    person.projectPreferences.forEach(function (entry, index) {
        if (entry === project.id) {
            satisfied = true;
            if (index === 3) score += 1;
            if (index === 2) score += 2;
            if (index === 1) score += 4;
        }
    });

    // if no preferred project, then person is unsatisfied, unless they gave
    // us no preferred projects
    if (!satisfied && person.projectPreferences.length > 0) score += UNSATISFIED_PENALTY;

    // bonus points if they get teammates they want
    person.personPreferences.forEach(function (entry) {
        project.people.forEach(function (pEntry) {
            if (entry === pEntry.id) {
                score += 1;
            }
        });
    });

    return score;
}

/**
 * Compute a fitness score for a single person on a project, when that person has no preference
 * on team vs project.
 *
 * @param {Object} person The person to be scored
 * @param {Object} project The project to be scored
 * @returns {number} The computed score
 */
function scoreForNoPreference(person, project) {
    // if they gave us no preferences to work with, we can't score them
    if (person.projectPreferences.length === 0 && person.personPreferences.length === 0) return 0;

    // score them both ways, and take the greater score
    let a = scoreForPreferProject(person, project);
    let b = scoreForPreferTeam(person, project);
    if (a >= b) return a;
    return b;
}

/**
 * Compute penalty to overall score for persons on a team with someone they wish to avoid.
 *
 * @param {Object} person The person to be scored
 * @param {Object} project The project to be scored
 * @returns {number} The computed penalty
 */
function scoreForAvoidedTeammates(person, project) {
    let penalty = 0;

    // For each avoided person on the same project, subtract a penalty
    person.personAvoidances.forEach(function (entry) {
        project.people.forEach(function (pEntry) {
            if (entry === pEntry.id) {
                penalty += AVOID_PENALTY;
            }
        });
    });

    return penalty;
}

/**
 * Compute a fitness score for a single person given their project.
 *
 * @param {Object} person The person to be scored
 * @param {Object} project The project to be scored
 * @returns {number} The computed score
 */
function scorePerson(person, project) {
    let total = 0;

    if (person.prefersTeam == null) {
        total += scoreForNoPreference(person, project);
    } else if (person.prefersTeam) {
        total += scoreForPreferTeam(person, project);
    } else {
        total += scoreForPreferProject(person, project);
    }

    total += scoreForAvoidedTeammates(person, project);

    return total;
}

/**
 * Scores a project based on student and project satisfaction.
 * 
 * This function returns a fitness score for just this project and the people on it. This score is
 * calculated according to certain bonuses (for team members getting preferred projects or teammates) and
 * penalties (for team members paired with people they wish to avoid, or for teams too small or too large).
 * The team member bonuses depend on their stated preferences.
 *
 * @param {Object} project The project to be scored
 * @returns {number} The computed score

 */
function scoreProject(project) {
    let total = 0;

    // If the amount of people on the project is non-zero but isn't within the
    // range requested for the project, then apply a penalty.
    if (project.people.length > 0 &&
        (project.people.length < project.minPeople || project.people.length > project.maxPeople)) {
        total += TEAM_SIZE_PENALTY;
    }

    for (let person of project.people) {
        total += scorePerson(person, project);
    }

    return total;
}

/**
 * Compute a fitness score for the entire set of project assignments.
 *
 * @param {Array<Object>} projects The array of projects to be scored
 * @returns {number} The computed score
 */
function scoreAllProjects(projects) {
    let totalScore = 0;

    for (let project of projects) {
        totalScore += scoreProject(project);
    }

    return totalScore;
}

exports.scoreAllProjects = scoreAllProjects;
exports.scorePerson = scorePerson

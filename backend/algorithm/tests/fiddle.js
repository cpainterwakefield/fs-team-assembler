/* Old greedy seed */
/*
function greedySeedInitial(students, projects, populationSize) {
    // List of sets of projects
    let projectPopulation = [];
    // Loop for creating each set of projects.
    for (let i = 0; i < populationSize; i++) {
        console.log(`Outer Index: ${i}`);

        // Index should be different for each iteration, so we seed with index
        let studentIndex = Math.floor(seededRandom(i) * students.length);

        // List of projects
        let projectList = [];
        let selected = new Array(students.length).fill(false);

        // Tracker variables for random population generation
        let numSelected = 0;
        let studentSeed = 0;

        // A deep copy of the list of projects for assigning to
        // the project list.
        let currentProjects = Object.assign({}, projects);

        // For each student, add random student to proper project
        while (numSelected < students.length) {
            console.log(`Num selected: ${numSelected}`);

            // Gets a random student index from the students array
            studentIndex = Math.floor(seededRandom(studentSeed) * students.length);

            if (students[studentIndex].projectPreferences.length == 0 && selected[studentIndex] == false) {
                let projectIndex = Math.floor(seededRandom((i + 1) * (j + 1)) * currentProjects.length);
                selected[studentIndex] = true;
                currentProjects[projectIndex].people.push(Object.assign({}, students[studentIndex]));

                // Add project to project list if full
                if (currentProjects[projectIndex].people.length == currentProjects[projectIndex].maxPeople){
                    projectList.push(Object.assign({}, currentProjects[projectIndex]));
                }
                
                // Increment the number of students selected
                numSelected++;
            } // Add student to preferred project
            else if (students[studentIndex].projectPreferences.length != 0 && selected[studentIndex] == false) {
                for (var k = 0; k < students[studentIndex].projectPreferences.length; k++) {
                    for (var l = 0; l < projects.length; l++) {
                        if (currentProjects[l].projectName == initialStudent.projectPreferences[k]) {
                            // If project is full, do nothing and increment to next project preference 
                            if (currentProjects[l].people.length >= currentProjects[l].maxPeople) {
                                break;
                            }
                            else {
                                currentProjects[l].people.push(Object.assign({}, initialStudent));
                                selected[l] = true;
                                //Add project to project list if full
                                if (currentProjects[l].people.length == currentProjects[l].maxPeople){
                                    projectList.push(Object.assign({}, currentProjects[l]));
                                }
                            }
                        }
                    }
                }
                if (selected[l] == false){
                    projectIndex = seededRandom(currentProjects.length);
                    selected[studentIndex] = true;
                    currentProjects[projectIndex].people.push(Object.assign({}, students[studentIndex])); 
                    // Add project to project list if full
                    if (currentProjects[projectIndex].people.length == currentProjects[projectIndex].maxPeople){
                        projectList.push(Object.assign({}, currentProjects[projectIndex]));
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
*/

const seeding = require('../seeding');

/**
 * A test for whether students are shallow or deep copied.
 * (This will become a problem if they are shallow copied).
 * 
 * As it turns out student objects (and other JSON) are only
 * shallow-copied by default, so when we want a deep copy, we'll
 * have to use Object.assign({}, <<object>>).
 * @param {An array of student objects.} studentArray 
 */
function checkDeepCopy(studentArray) {
    let projectArray = []; // Not actually composed of project objects
    for (let i = 0; i < 5; i++) {
        let project = []; 

        for (let student of studentArray) {
            project.push(Object.assign({}, student));
        }

        projectArray.push(Object.assign({}, project));
    }

    /*
    for (let proj of projectArray) {
        console.log(proj);
        console.log("\n");
    }
    */

    projectArray[0][3].prefersTeam = false;

    for (let proj of projectArray) {
        console.log(proj);
        console.log("\n");
    }
}

var testStudentsNormal = {
    firstStudent : {
        name: "Devon",
        prefersTeam: false,
        projectPreferences: ["first", "second", "third"],
        personPreferences: ["Alice", "Bob"],
        personAvoidances: [] 
    },

    secondStudent : {
        name: "Clive",
        prefersTeam: true,
        projectPreferences: ["second", "third"],
        personPreferences: ["Devon"],
        personAvoidances: ["Bea"]
    },

    thirdStudent : {
        name: "Bob",
        prefersTeam: undefined,
        projectPreferences: ["first", "second"],
        personPreferences: ["Alice", "Clive", "Devon"],
        personAvoidances: ["Duncan"]
    },

    fourthStudent : {
        name: "Alice",
        prefersTeam: true,
        projectPreferences: ["second"],
        personPreferences: ["Clive", "Bob"],
        personAvoidances: ["Cathy"]
    }
};

var testProjectsNormal = {
    firstProject : {
        name: "first",
        minPeople: 3,
        maxPeople: 5,
        people: []
    },

    secondProject : {
        name: "second",
        minPeople: 3,
        maxPeople: 5,
        people: []
    },

    thirdProject : {
        name: "third",
        minPeople: 3,
        maxPeople: 5,
        people: []
    }
}

var testNormalList = [testStudentsNormal.firstStudent, testStudentsNormal.secondStudent,
    testStudentsNormal.thirdStudent, testStudentsNormal.fourthStudent];

var testProjectList = [testProjectsNormal.firstProject, testProjectsNormal.secondProject,
    testProjectsNormal.thirdProject];

// checkDeepCopy(testNormalList);

let population = seeding.greedySeedInitial(testNormalList, testProjectList, 10);

/*
for (let individual of population) {
    console.log("----------\n");
    console.log(individual);
    console.log("----------\n");
}
*/

console.log("PEOPLE:");
for (let individual of population) {
    console.log(`Individual:`);
    console.log(individual);

    console.log(">>>>>>>>>>\n");
    for (let project of individual) {
        console.log(`Project: ${project.name}`);
        for (let person of project.people) {
            console.log("----------\n");
            console.log(person);
            console.log("----------\n");
        }
    }
    console.log(">>>>>>>>>>\n");
}

const dbInt = require('../db_interactions');

(async () => {
    await dbInt.helloPostgres();
})();

(async () => {
    console.log(await dbInt.getStudentPk(1));
})();
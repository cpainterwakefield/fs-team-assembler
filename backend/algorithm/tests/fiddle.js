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

const algorithm = require('../algorithm');
let population = algorithm.gSI(testNormalList, testProjectList, 10);

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
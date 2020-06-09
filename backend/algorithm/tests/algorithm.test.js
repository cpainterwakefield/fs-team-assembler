var _ = require('lodash');
const algorithm = require('../algorithm');
const scoring = require('../scoring');
const seeding = require('../seeding');
const verifiers = require('./verifiers');

/**
 * A object encoding four students in a 4-clique of preferences.
 * Project preferences are not in an ideal clique (this set of students)
 * (will not generate a "perfect score" so-to-speak), but avoidances
 * essentially are.
 */
var testStudentsClique = {
    firstStudent: {
        id: 1,
        prefersTeam: true,
        projectPreferences: [1, 2, 3],
        personPreferences: [2, 3, 4],
        personAvoidances: [5, 6, 7]
    },

    secondStudent: {
        id: 2,
        prefersTeam: true,
        projectPreferences: [3, 1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [5, 6, 8]
    },

    thirdStudent: {
        id: 3,
        prefersTeam: true,
        projectPreferences: [3, 2, 1],
        personPreferences: [1, 2, 4],
        personAvoidances: [5, 7, 8]
    },

    fourthStudent: {
        id: 4,
        prefersTeam: true,
        projectPreferences: [2, 3, 1],
        personPreferences: [2, 3, 4],
        personAvoidances: [6, 7, 8]
    }
}

/**
 * A test project with people/students populated.
 * 
 * The project name is "third" just to fit with the student test data.
 * More realistically, the name will be something like "CSM [prof. name]"
 * or "[company name]".
 */
var testProjectClique = {
    id: 3,
    minPeople: 3,
    maxPeople: 5,
    people: [testStudentsClique.firstStudent, testStudentsClique.secondStudent,
    testStudentsClique.thirdStudent, testStudentsClique.fourthStudent]
};

var testStudentsNormal = {
    firstStudent: {
        id: 4,
        prefersTeam: false,
        projectPreferences: [1, 2, 3],
        personPreferences: [1, 2],
        personAvoidances: []
    },

    secondStudent: {
        id: 3,
        prefersTeam: true,
        projectPreferences: [2, 3],
        personPreferences: [1],
        personAvoidances: [7]
    },

    thirdStudent: {
        id: 2,
        prefersTeam: undefined,
        projectPreferences: [1, 2],
        personPreferences: [4, 3, 1],
        personAvoidances: [5]
    },

    fourthStudent: {
        id: 1,
        prefersTeam: true,
        projectPreferences: [2],
        personPreferences: [2, 3],
        personAvoidances: [7]
    }
};

var testProjectNormal = {
    id: 2,
    minPeople: 4,
    maxPeople: 5,
    people: [testStudentsNormal.firstStudent, testStudentsNormal.secondStudent,
    testStudentsNormal.thirdStudent, testStudentsNormal.fourthStudent]
};

var testStudentsNormal2 = {
    firstStudent: {
        id: 4,
        prefersTeam: false,
        projectPreferences: [1, 2, 3],
        personPreferences: [1, 2],
        personAvoidances: []
    },

    secondStudent: {
        id: 3,
        prefersTeam: true,
        projectPreferences: [2, 3],
        personPreferences: [4],
        personAvoidances: [2]
    },

    thirdStudent: {
        id: 2,
        prefersTeam: undefined,
        projectPreferences: [1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [8]
    },

    fourthStudent: {
        id: 1,
        prefersTeam: true,
        projectPreferences: [2],
        personPreferences: [3],
        personAvoidances: [2],
    }
};
var testProjectNormal2 = {
    id: 2,
    minPeople: 4,
    maxPeople: 5,
    people: [testStudentsNormal2.firstStudent, testStudentsNormal2.secondStudent,
    testStudentsNormal2.thirdStudent, testStudentsNormal2.fourthStudent]
};

var testStudentsNormal3 = {
    firstStudent: {
        id: 4,
        prefersTeam: false,
        projectPreferences: [1, 2, 3],
        personPreferences: [1, 2],
        personAvoidances: []
    },

    secondStudent: {
        id: 3,
        prefersTeam: true,
        projectPreferences: [2, 3],
        personPreferences: [4, 2],
        personAvoidances: [6]
    },

    thirdStudent: {
        id: 2,
        prefersTeam: undefined,
        projectPreferences: [1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [8]
    },

    fourthStudent: {
        id: 1,
        prefersTeam: true,
        projectPreferences: [2],
        personPreferences: [3, 2],
        personAvoidances: [7]
    }
};

var testProjectNormal3 = {
    id: 2,
    minPeople: 4,
    maxPeople: 5,
    people: [testStudentsNormal3.firstStudent, testStudentsNormal3.secondStudent,
    testStudentsNormal3.thirdStudent, testStudentsNormal3.fourthStudent]
};

var generation1 = [[testProjectNormal], [testProjectNormal2], [testProjectNormal3]]


var firstStudent = {
    id: 1,
    prefersTeam: false,
    projectPreferences: [1, 2, 3],
    personPreferences: [7],
    personAvoidances: []
};

var secondStudent = {
    id: 2,
    prefersTeam: true,
    projectPreferences: [2, 3],
    personPreferences: [4, 2],
    personAvoidances: [6]
};

var thirdStudent = {
    id: 3,
    prefersTeam: undefined,
    projectPreferences: [1, 2],
    personPreferences: [1, 3, 4],
    personAvoidances: [8]
};

var fourthStudent = {
    id: 4,
    prefersTeam: true,
    projectPreferences: [2],
    personPreferences: [3, 2],
    personAvoidances: [7]
};

var fifthStudent = {
    id: 5,
    prefersTeam: false,
    projectPreferences: [3],
    personPreferences: [1, 2],
    personAvoidances: []
};

var sixthStudent = {
    id: 6,
    prefersTeam: false,
    projectPreferences: [3],
    personPreferences: [1, 2],
    personAvoidances: []
};

var seventhStudent = {
    id: 7,
    prefersTeam: false,
    projectPreferences: [2],
    personPreferences: [1, 2],
    personAvoidances: []
};

var eightStudent = {
    id: 8,
    prefersTeam: false,
    projectPreferences: [1],
    personPreferences: [1, 2],
    personAvoidances: []
};



var proj1 = {
    id: 1,
    minPeople: 2,
    maxPeople: 3,
    people: []
};

var proj2 = {
    id: 2,
    minPeople: 1,
    maxPeople: 2,
    people: []
};

var proj3 = {
    id: 3,
    minPeople: 1,
    maxPeople: 3,
    people: []
};

var projList = [proj1, proj2, proj3];
var studentList = [firstStudent, secondStudent, thirdStudent, fourthStudent, fifthStudent, sixthStudent, seventhStudent, eightStudent];

function loadTestSet() {
    generationTest = seeding.greedySeedInitial(studentList,projList, 10);
    projectTest = algorithm.generationSelection(generationTest);
    
    return projectTest;
}

function sameID(stu1, stu2) {
    if(stu1.id == stu2.id) {
        return true;
    }
}

test('Each student should be assigned only once.' , () => {
    expect(verifiers.everyStudentAssignedOnce(studentList, loadTestSet())).toBe(true);
});

test('Nobody should get paired with anyone that they avoid.', () => {
    expect(verifiers.noAvoidsOnSameProject(loadTestSet())).toBe(false);
}); 

test('If someone prefers projects over teammates, they should be on a project \
    that they prefer.', () => {
        let isInProj = true;
        loadTestSet();
        for(let i = 0; i < projectTest[0].people.length; i++) {
            if(projectTest[0].people[i].id == secondStudent.id || projectTest[1].people[i].id == secondStudent.id) {
                isInProj = true;
            }
        }
        expect(isInProj).toBe(true);
});

test('If someone prefers teammates over projects, they should have a teammate \
    that they prefer.', () => {
    let isWithPeoplePref = false;

    loadTestSet();
    // console.log(projectTest[2]);
    for (let i = 0; i < projectTest.length; i++) {
        for (let j = 0; j < projectTest[i].people.length; j++) {
            for (let k = 0; k < projectTest[i].people.length; k++) {
                if (k != j) {
                    let preferrer = projectTest[i].people[j];
                    for (let l = 0; l < preferrer.personPreferences.length; l++) {
                        if (projectTest[i].people[k].id == preferrer.personPreferences[l]) {
                            isWithPeoplePref = true;
                        }
                    }
                }
            }
        }
    }

    expect(isWithPeoplePref).toBe(true);
});

test('Generation selction function selects best fit project list.', () => {
    // Should select testProjectNormal
    expect(algorithm.generationSelection(generation1)).toEqual([testProjectNormal3]);
})

test('New generation is not the same as previous fit generation, and has 1000 project lists.', () => {
    // Should select testProjectNormal
    expect(algorithm.generateFromFittest(algorithm.generationSelection(generation1), 1000)).not.toBe(generation1);
    expect(algorithm.generateFromFittest(algorithm.generationSelection(generation1), 1000).length).toBe(1000);
})
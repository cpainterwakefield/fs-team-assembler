const scoring = require('../scoring');
const dbInt = require('../db_interactions');

/**
 * A object encoding four students in a 4-clique of preferences.
 * Project preferences are not in an ideal clique (this set of students)
 * (will not generate a "perfect score" so-to-speak), but avoidances
 * essentially are.
 */
var testStudentsClique = {
    firstStudent : {
        id: 1,
        prefersTeam: true,
        projectPreferences: [1, 2, 3],
        personPreferences: [2, 3, 4],
        personAvoidances: [5, 6, 7]
    },

    secondStudent : {
        id: 2,
        prefersTeam: true,
        projectPreferences: [3, 1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [5, 6, 8]
    },

    thirdStudent : {
        id: 3,
        prefersTeam: true,
        projectPreferences: [3, 2, 1],
        personPreferences: [1, 2, 4],
        personAvoidances: [5, 7, 8]
    },

    fourthStudent : {
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
    firstStudent : {
        id: 4,
        prefersTeam: false,
        projectPreferences: [1, 2, 3],
        personPreferences: [1, 2],
        personAvoidances: [] 
    },

    secondStudent : {
        id: 3,
        prefersTeam: true,
        projectPreferences: [2, 3],
        personPreferences: [1],
        personAvoidances: [7]
    },

    thirdStudent : {
        id: 2,
        prefersTeam: null,
        projectPreferences: [1, 2],
        personPreferences: [4, 3, 1],
        personAvoidances: [5]
    },

    fourthStudent : {
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

/**
 * A object encoding four students in a 4-clique of preferences.
 * Project preferences are not in an ideal clique (this set of students)
 * (will not generate a "perfect score" so-to-speak), but avoidances
 * essentially are.
 */
var testStudentsClique = {
    firstStudent : {
        id: 1,
        prefersTeam: true,
        projectPreferences: [1, 2, 3],
        personPreferences: [2, 3, 4],
        personAvoidances: [5, 6, 7]
    },

    secondStudent : {
        id: 2,
        prefersTeam: true,
        projectPreferences: [3, 1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [5, 6, 8]
    },

    thirdStudent : {
        id: 3,
        prefersTeam: true,
        projectPreferences: [3, 2, 1],
        personPreferences: [1, 2, 4],
        personAvoidances: [5, 7, 8]
    },

    fourthStudent : {
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
    firstStudent : {
        id: 4,
        prefersTeam: false,
        projectPreferences: [1, 2, 3],
        personPreferences: [1, 2],
        personAvoidances: [] 
    },

    secondStudent : {
        id: 3,
        prefersTeam: true,
        projectPreferences: [2, 3],
        personPreferences: [1],
        personAvoidances: [7]
    },

    thirdStudent : {
        id: 2,
        prefersTeam: null,
        projectPreferences: [1, 2],
        personPreferences: [4, 3, 1],
        personAvoidances: [5]
    },

    fourthStudent : {
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

test('Team scoring w/ project preference should be accurate.', () => {
    // Should be 1
    // (The first student prefers teammates, and the project named)
    // ("third" is their least preference)
    expect(scoring.scoreProjectPreferences(testProjectClique,
        testStudentsClique.firstStudent, 3)).toBe(1);

    // Should be 3
    // (The third student prefers teammates, and the project named)
    // ("third" is their least preference)
    expect(scoring.scoreProjectPreferences(testProjectClique,
        testStudentsClique.thirdStudent, 3)).toBe(3);
});

test('Team scoring w/ teammate preference should be accurate.', () => {
    // Should be 4
    // (The second student prefers teammates, and three of their)
    // (preferred students are on the project. We add two for every)
    // (student on the project *over* the first one).
    expect(scoring.scorePersonPreferences(testProjectClique,
        testStudentsClique.secondStudent, 2)).toBe(4);

    // Should be 4
    // (ditto the previous test)
    expect(scoring.scorePersonPreferences(testProjectClique,
        testStudentsClique.fourthStudent, 2)).toBe(4);
});

test('Team scoring for projects should be accurate.', () => {
    // Should be 25
    expect(scoring.scoreProject(testProjectClique)).toBe(25);
});

test('Assuming easy test data is loaded, team scoring projects should be accurate.', () => {
    (async () => {
        let algoJson = await dbInt.loadAndConvert();
        let students = algoJson.students;
        let projects = algoJson.projects;

        let testProject = projects[2];
        testProject.people = [students[0], students[1], students[2], students[3]];

        expect(scoring.scoreProject(testProject)).toBe(25);
    })();
});
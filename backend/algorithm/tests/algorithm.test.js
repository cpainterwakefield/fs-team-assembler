const algorithm = require('../algorithm');
const scoring = require('../scoring');
const seeding = require('../seeding');

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
        prefersTeam: undefined,
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

var testStudentsNormal2 = {
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
        personPreferences: [4],
        personAvoidances: [2]
    },

    thirdStudent : {
        id: 2,
        prefersTeam: undefined,
        projectPreferences: [1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [8]
    },

    fourthStudent : {
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
        personPreferences: [4, 2], 
        personAvoidances: [6] 
    },

    thirdStudent : {
        id: 2,
        prefersTeam: undefined,
        projectPreferences: [1, 2],
        personPreferences: [1, 3, 4],
        personAvoidances: [8] 
    },

    fourthStudent : {
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

test('Nobody should get paired with anyone that they avoid.', () => {

});

test('If someone prefers projects over teammates, they should be on a project \
    that they prefer.', () => {
    // TODO: Write test
});

test('If someone prefers teammates over projects, they should have a teammate \
    that they prefer.', () => {
    // TODO: Write test
});

test('If someone is ambivalent, they should have at least one or another condition met.',
    () => {
    // TODO: Write test
});

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

test('Generation selction function selects best fit project list.', () => {
    // Should select testProjectNormal
    expect(algorithm.generationSelection(generation1)).toEqual([testProjectNormal3]);
})

test('New generation is not the same as previous fit generation, and has 1000 project lists.', () => {
    // Should select testProjectNormal
    expect(algorithm.generateFromFittest(algorithm.generationSelection(generation1), 1000)).not.toBe(generation1);
    expect(algorithm.generateFromFittest(algorithm.generationSelection(generation1), 1000).length).toBe(1000);
})
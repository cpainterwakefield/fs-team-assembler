const algorithm = require('../algorithm');

/**
 * A object encoding four students in a 4-clique of preferences.
 * Project preferences are not in an ideal clique (this set of students)
 * (will not generate a "perfect score" so-to-speak), but avoidances
 * essentially are.
 */

// devon: 5; clive: 6; bob: 7; alice: 7
// total: 25
var testStudentsClique = {
    firstStudent : {
        name: "Devon",
        prefersTeam: true,
        projectPreferences: ["first", "second", "third"],
        personPreferences: ["Alice", "Bob", "Clive"],
        personAvoidances: ["Adam", "Bea", "Cathy"]
    },

    secondStudent : {
        name: "Clive",
        prefersTeam: true,
        projectPreferences: ["second", "third", "first"],
        personPreferences: ["Bob", "Clive", "Devon"],
        personAvoidances: ["Adam", "Bea", "Duncan"]
    },

    thirdStudent : {
        name: "Bob",
        prefersTeam: true,
        projectPreferences: ["third", "first", "second"],
        personPreferences: ["Alice", "Clive", "Devon"],
        personAvoidances: ["Adam", "Cathy", "Duncan"]
    },

    fourthStudent : {
        name: "Alice",
        prefersTeam: true,
        projectPreferences: ["third", "second", "first"],
        personPreferences: ["Bob", "Clive", "Devon"],
        personAvoidances: ["Bea", "Cathy", "Duncan"]
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
    projectName: "third",
    minPeople: 3,
    maxPeople: 5,
    people: [testStudentsClique.firstStudent, testStudentsClique.secondStudent,
        testStudentsClique.thirdStudent, testStudentsClique.fourthStudent]
};

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

var testProjectNormal = {
    projectName: "second",
    minPeople: 4,
    maxPeople: 5,
    people: [testStudentsNormal.firstStudent, testStudentsNormal.secondStudent,
        testStudentsNormal.thirdStudent, testStudentsNormal.fourthStudent]
};

/*
test('Nobody should get paired with anyone that they avoid.', () => {
    // TODO: Write test
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
*/

test('Team scoring w/ project preference should be accurate.', () => {
    // Should be 1
    // (The first student prefers teammates, and the project named)
    // ("third" is their least preference)
    expect(algorithm.scoreProjectPreferences(testProjectClique,
        testStudentsClique.firstStudent, 3)).toBe(1);

    // Should be 3
    // (The third student prefers teammates, and the project named)
    // ("third" is their least preference)
    expect(algorithm.scoreProjectPreferences(testProjectClique,
        testStudentsClique.thirdStudent, 3)).toBe(3);
});

test('Team scoring w/ teammate preference should be accurate.', () => {
    // Should be 4
    // (The second student prefers teammates, and three of their)
    // (preferred students are on the project. We add two for every)
    // (student on the project *over* the first one).
    expect(algorithm.scorePersonPreferences(testProjectClique,
        testStudentsClique.secondStudent, 2)).toBe(4);

    // Should be 4
    // (ditto the previous test)
    expect(algorithm.scorePersonPreferences(testProjectClique,
        testStudentsClique.fourthStudent, 2)).toBe(4);
});

test('Team scoring for whole projects should be accurate.', () => {
    // Should be 25
    expect(algorithm.scoreProject(testProjectClique)).toBe(25);
})
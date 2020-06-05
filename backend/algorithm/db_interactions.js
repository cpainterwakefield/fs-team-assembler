/**
 * db_interactions.js
 * 
 * Contains functions which encapsulate internal calls to the DB, specifically
 * for obtaining and posting data related to the algorithm.
 * 
 * @author Jo Westarp
 */

const db = require("../models");
const _ = require('lodash');

/* Quick "hello world" function that tries to get some JSON from the DB.
 * TODO: Should be a test instead.
 */
async function helloPostgres() {
    console.log('Hello Postgres');
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database', error);
    }
}

/**
 * Gets all the students from the DB.
 * The DB model uses JSON, so we get the response as JSON.
 *
 * You must use it like this, because findAll() is async:
    (async () => {
        console.log(await getAllStudents()) // or do whatever you're doing with it
    })()
 */
async function getAllStudents() {
    const theStudents = await db.students.findAll();
    return theStudents;
}

/**
 * Gets a student by their primary key.
 */
async function getStudentPk(primaryKey) {
    const { QueryTypes } = require('sequelize');
    const student = await db.sequelize.query("SELECT * FROM students",
        { type: QueryTypes.SELECT });

    return student;
}

/**
 * Gets all the projects from the DB.
 * The DB model uses JSON, so we get the response as JSON.
 */
async function getAllProjects() {
    const theProjects = await db.projects.findAll();
    return theProjects;
}

/**
 * Gets all of the necessary data from the DB for the algorithm to generate teams.
 * 
 * Selects from each table that has necessary information, and then returns that
 * info in a JSON object consisting of students, projects, prefer cross-references,
 * and avoid cross-references.
 * 
 * This function is *not* vulnerable to SQL injections, as there is no string
 * interpolation. Each query is a static string.
 */
async function getDBJson () {
    const { QueryTypes } = require('sequelize');

    const students = await db.sequelize.query(`SELECT "id", "selection_preference", \
        "first_project", "second_project", "third_project" FROM students`,
        { type: QueryTypes.SELECT });
    const projects = await db.sequelize.query(`SELECT "id", "min_students", "max_students" FROM projects`,
        { type: QueryTypes.SELECT });
    const prefer_xrefs = await db.sequelize.query(`SELECT "student_id", "preferree_id" FROM prefer_teammate_xrefs`,
        { type: QueryTypes.SELECT });
    const avoid_xrefs = await db.sequelize.query(`SELECT "student_id", "avoidee_id" FROM avoid_teammate_xrefs`,
        { type: QueryTypes.SELECT });

    let dbJSON = {
        "students": students,
        "projects": projects,
        "prefer_xrefs": prefer_xrefs,
        "avoid_xrefs": avoid_xrefs
    };

    return dbJSON;
}

/**
 * Converts the JSON received from the DB to the format that
 * the algorithm code uses.
 * 
 * The algorithm code, in specific, stores students *in* projects,
 * with no xrefs. Thus, we need to pull from xref tables and student
 * and project tables to put together our algorithm format.
 * 
 * @param {The JSON returned from the DB.} json 
 */
function convertDBResponse(dbJSON) {
    let students = [];
    let projects = [];

    // console.log(dbJSON.students);

    // For every student in the DB,
    for (let student of dbJSON.students) {
        // Create an algo student object with the following properties.
        let newStudent = {
            "id" : student.id,
            "prefersTeam" : student.selection_preference,
            // Project preferences are an ordered list on the algo side.
            "projectPreferences" : [student.first_project, student.second_project,
                student.third_project],
            
            // Both of these lists are empty for the moment;
            // they will be populated based off of the teammate xref tables.
            "personPreferences" : [],
            "personAvoidances" : []
        };

        // Push the student to the list of students.
        students.push(newStudent);
    }

    // For every project in the DB,
    for (let project of dbJSON.projects) {
        // Create a new algo project object with the following properties.
        let newProject = {
            "id" : project.id,
            "minPeople" : project.min_students,
            "maxPeople" : project.max_students,
            // This field is an empty list for now because it will be populated
            // by the seeding function(s) later.
            "people" : []
        };

        // Push the project to the list of projects.
        projects.push(newProject);
    }

    // For every preference xref, place appropriate ID in each student object.
    for (let prefer_xref of dbJSON.prefer_xrefs) {
        let preferrer = prefer_xref.student_id;
        let preferree = prefer_xref.preferree_id;

        // Find the student based on ID, not index
        let preferrerStudent = students.find(e => e.id == preferrer);

        // If there is a student preference, then...
        if (preferrerStudent != undefined) {
            // Push the ID of the avoidee, not the avoidee object
            preferrerStudent.personPreferences.push(preferree);
        }
    }

    // For every avoidance xref, place appropriate ID in each student object.
    for (let avoid_xref of dbJSON.avoid_xrefs) {
        let avoider = avoid_xref.student_id;
        let avoidee = avoid_xref.avoidee_id;

        // Find the student based on ID, not index
        let avoiderStudent = students.find(e => e.id == avoider);

        // If there is a student avoid, then...
        if (avoiderStudent != undefined) {
            // Push the ID of the avoidee, not the avoidee object
            avoiderStudent.personAvoidances.push(avoidee);
        }
    }
    
    let algoJSON = {
        "students": students,
        "projects": projects,
    };

    return algoJSON;
}

// Standard Sequelize util functions
exports.helloPostgres = helloPostgres;
exports.getAllStudents = getAllStudents;
exports.getAllProjects = getAllProjects;
exports.getStudentPk = getStudentPk;

// DB conversions
exports.getDBJson = getDBJson;
exports.convertDBResponse = convertDBResponse;

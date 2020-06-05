/**
 * db_interactions.js
 * 
 * Contains functions which encapsulate internal calls to the DB, specifically
 * for obtaining and posting data related to the algorithm.
 * 
 * @author Jo Westarp
 */

const db = require("../models");

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
async function getAlgoJSON() {
    const { QueryTypes } = require('sequelize');

    const students = await db.sequelize.query(`SELECT "id", "selection_preference", \
        "first_project", "second_project", "third_project" FROM students`,
        { type: QueryTypes.SELECT });
    const projects = await db.sequelize.query(`SELECT "id", "min_students", "max_students" FROM projects`,
        { type: QueryTypes.SELECT });
    const prefer_xrefs = await db.sequelize.query(`SELECT "preferrer_id", "preferree_id" FROM prefer_teammate_xref`,
        { type: QueryTypes.SELECT });
    const avoid_xrefs = await db.sequelize.query(`SELECT "avoider_id", "avoidee_id" FROM avoid_teammate_xref`,
        { type: QueryTypes.SELECT });

    const algoJSON = {
        "students": students,
        "projects": projects,
        "prefer_xrefs": prefer_xrefs,
        "avoid_xrefs": avoid_xrefs
    };

    return algoJSON;
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
function convertDBResponse(json) {
    
    return json;
}

exports.helloPostgres = helloPostgres;
exports.getAllStudents = getAllStudents;
exports.getAllProjects = getAllProjects;
exports.getAlgoJSON = getAlgoJSON;
exports.convertDBResponse = convertDBResponse;

exports.getStudentPk = getStudentPk;
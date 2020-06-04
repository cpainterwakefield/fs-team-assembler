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
 * Gets all the projects from the DB.
 * The DB model uses JSON, so we get the response as JSON.
 */
async function getAllProjects() {
    const theProjects = await db.projects.findAll();
    return theProjects;
}

exports.getAllStudents = getAllStudents;
exports.getAllProjects = getAllProjects;
const db = require("../models");

const Student = db.students;
const project = db.projects;
const avoid = db.avoids;
const prefer = db.prefers;

const Op = db.Sequelize.Op;

module.exports = app => {
    const algorithm = require("../controllers/algorithm.controller.js");

    var router = require("express").Router();

    // Get all the clients
    router.get("/", algorithm.findAll);

    app.use('/api/algorithm', router);
}
module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    // Create a new student 
    router.post("/", students.create);

    // Get all the students 
    router.get("/", students.findAll);

    // Find a student by a certain ID
    router.get("/:id", students.findOne);

    // Update a student via a certain ID
    router.put("/:id", students.update);

    // Delete a student with the given ID
    router.delete("/:id", students.delete);

    // Delete all students (ooo!)
    router.delete("/", students.deleteAll);

    app.use('/api/students', router);
}
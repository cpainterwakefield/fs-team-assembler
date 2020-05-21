module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    // Create a new client
    router.post("/", students.create);

    // Get all the clients
    router.get("/", students.findAll);

    // Find a client by a certain ID
    router.get("/:id", students.findOne);

    // Update a client via a certain ID
    router.put("/:id", students.update);

    // Delete a client with the given ID
    router.delete("/:id", students.delete);

    // Delete all clients (ooo!)
    router.delete("/", students.deleteAll);

    app.use('/api/student', router);
}
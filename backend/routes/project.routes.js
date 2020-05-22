module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    // Create a new client
    router.post("/", projects.create);

    // Get all the clients
    router.get("/", projects.findAll);

    // Find a client by a certain ID
    router.get("/:id", projects.findOne);

    // Update a client via a certain ID
    router.put("/:id", projects.update);

    // Delete a client with the given ID
    router.delete("/:id", projects.delete);

    // Delete all clients (ooo!)
    router.delete("/", projects.deleteAll);

    app.use('/api/projects', router);
}
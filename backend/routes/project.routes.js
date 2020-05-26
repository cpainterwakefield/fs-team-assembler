module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    // Create a new project 
    router.post("/", projects.create);

    // Get all the projects 
    router.get("/", projects.findAll);

    // Find a project by a certain ID
    router.get("/:id", projects.findOne);

    // Update a project via a certain ID
    router.put("/:id", projects.update);

    // Delete a project with the given ID
    router.delete("/:id", projects.delete);

    // Delete all projects (ooo!)
    router.delete("/", projects.deleteAll);

    app.use('/api/projects', router);
}
module.exports = app => {
    const clients = require("../controllers/client.controller.js");

    var router = require("express").Router();

    // Create a new client
    router.post("/", clients.create);

    // Get all the clients
    router.get("/", clients.findAll);

    // Find a client by a certain ID
    router.get("/:id", clients.findOne);

    // Update a client via a certain ID
    router.put("/:id", clients.update);

    // Delete a client with the given ID
    router.delete("/:id", clients.delete);

    // Delete all clients (ooo!)
    router.delete("/", clients.deleteAll);

    app.use('/api/tutorials', router);
}
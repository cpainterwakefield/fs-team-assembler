const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and save a new Client table
exports.create = (req, res) => {
    if (!req.body.name) {
        // If there is no name, then there's no point in storing a Client.
        res.status(400).send({
            message: "Content cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const client = {
        name: req.body.name
    };

    // Create a client from the JSON object client.
    Client.create(client)
        .then(data => {
            // Send the actual client data as a response.
            res.send(data);
        })
        .catch(err => {
            // If an error is caught, send a 500 response with either a specific
            // or generic error message.
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a Client."
            });
        });
};

// Get all the Clients from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    var condition = title ? conditionResult : null;

    Client.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Clients."
            });
        });
};

// Get a single Client from the database
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

// Update a single Client via its ID
exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Client was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Client with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Client with id=" + id
        });
    });
};

// Delete a Client via its ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Client.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Client was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Client with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    });
};

// Delete all Clients from the DB
// Probably don't want this functionality for anything.
exports.deleteAll = (req, res) => {

};
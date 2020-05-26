const db = require("../models");
const Project = db.projects;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        // If there is no name, then there's no point in storing a Project.
        res.status(400).send({
            message: "Name cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const project = {
        name: req.body.name,
        description: req.body.description,
        min_students: req.body.min_students,
        max_students: req.body.max_students
    };

    // Create a Project from the JSON object project.
    Project.create(project)
        .then(data => {
            // Send the actual student data as a response.
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

// Get all the Project from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    var condition = title ? conditionResult : null;

    Project.findAll({ where: condition })
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

// Get a single Project from the database
exports.findOne = (req, res) => {
    const id = req.params.id;

    Project.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

// Update a single Project via its ID
exports.update = (req, res) => {
    const id = req.params.id;
    //UPDATE Project DATA BELOW
    Project.update(req.body, {
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
        
    });
};

// Delete a Project via its ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Project.destroy({
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

// Delete all Projects from the DB
// Probably don't want this functionality for anything.
exports.deleteAll = (req, res) => {

};
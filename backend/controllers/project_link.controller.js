const db = require("../models");
const project_link = db.project_link;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.link) {
        // If there is no name, then there's no point in storing a project_link.
        res.status(400).send({
            message: "link cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const project = {
        link: req.body.link,
    };

    // Create a project_link from the JSON object project.
    project_link.create(project)
        .then(data => {
            // Send the actual project data as a response.
            res.send(data);
        })
        .catch(err => {
            // If an error is caught, send a 500 response with either a specific
            // or generic error message.
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a project_link."
            });
        });
};

// Get all the project_link from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    var condition = title ? conditionResult : null;

    project_link.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving project links."
            });
        });
};

// Get a single project_link from the database
exports.findOne = (req, res) => {
    const id = req.params.id;

    project_link.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving project link with id=" + id
            });
        });
};

// Update a single project_link via its ID
exports.update = (req, res) => {
    const id = req.params.id;
    //UPDATE project_link DATA BELOW
    project_link.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "project link was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update project link with id=${id}.`
            });
        }
        
    })
    .catch(err => {
        
    });
};

// Delete a project_link via its ID
exports.delete = (req, res) => {
    const id = req.params.id;

    project_link.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "project link was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete project link with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    });
};

// Delete all project_links from the DB
// Probably don't want this functionality for anything.
exports.deleteAll = (req, res) => {
    project_link.destroy({where: {}})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "project link was deleted successfully."
            });
        } else {
            res.send({
                message: "Cannot delete projects"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete projects"
        });
        console.log(err)
    });
};

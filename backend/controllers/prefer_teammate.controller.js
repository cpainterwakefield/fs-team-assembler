const db = require("../models");
const Prefer_Teammate = db.prefer_teammate;
const Op = db.Sequelize.Op;

// Create and save a new Prefer_Teammate table
exports.create = (req, res) => {
    if (!req.body.preferrer_id) {
        // If there is no name, then there's no point in storing a Prefer_Teammate.
        res.status(400).send({
            message: "Preferrer cannot be empty."
        });

        // Don't create anything.
        return;
    }
    if (!req.body.preferree_id) {
        // If there is no name, then there's no point in storing a Prefer_Teammate.
        res.status(400).send({
            message: "Preferree cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const prefer_teammate = {
        preferreeId: req.body.preferree_id,
        studentId: req['user'].student.id,

    };

    // Create a prefer_teammate from the JSON object prefer_teammate.
    Prefer_Teammate.create(prefer_teammate)
        .then(data => {
            // Send the actual prefer_teammate data as a response.
            res.send(data);
        })
        .catch(err => {
            // If an error is caught, send a 500 response with either a specific
            // or generic error message.
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a Prefer_Teammate."
            });
        });
};

// Get all the Prefer_Teammates from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    var condition = title ? conditionResult : null;

    Prefer_Teammate.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Prefer_Teammates."
            });
        });
};

// Get a single Prefer_Teammate from the database
exports.findOne = (req, res) => {
    Prefer_Teammate.findAll({attributes: ['preferreeId'], where: {studentId : req['user'].student.id} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving Prefer_Teammate"
            });
        });
};

// Update a single Prefer_Teammate via its ID
exports.update = (req, res) => {
    const id = req.params.id;

    Prefer_Teammate.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Prefer_Teammate was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Prefer_Teammate with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error updating Prefer_Teammate"
        });
    });
};

// Delete a Prefer_Teammate via its ID
exports.delete = (req, res) => {
    const id = req['user'].student.id;

    Prefer_Teammate.destroy({
        where: { studentId: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Prefer_Teammate was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Prefer_Teammate with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Could not delete Prefer_Teammate"
        });
    });
};

// Delete all Prefer_Teammates from the DB
// Probably don't want this functionality for anything.
exports.deleteAll = (req, res) => {

};

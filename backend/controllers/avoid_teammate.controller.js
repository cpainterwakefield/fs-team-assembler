const db = require("../models");
const Avoid_Teammate = db.avoid_teammate;
const Op = db.Sequelize.Op;

// Create and save a new Avoid_Teammate table
exports.create = (req, res) => {
    console.log(req.body.avoider_id + "AVOIDER")
    console.log(req.body.avoidee_id + "AVOIDEE")

    if (!req.body.avoider_id) {
        // If there is no name, then there's no point in storing a Avoid_Teammate.
        res.status(400).send({
            message: "Avoider cannot be empty."
        });

        // Don't create anything.
        return;
    }
    if (!req.body.avoidee_id) {
        // If there is no name, then there's no point in storing a Avoid_Teammate.
        res.status(400).send({
            message: "Avoidee cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const avoid_teammate = {
        avoideeId: req.body.avoidee_id,
        studentId: req.body.avoider_id,

    };

    // Create a avoid_teammate from the JSON object avoid_teammate.
    Avoid_Teammate.create(avoid_teammate)
        .then(data => {
            // Send the actual avoid_teammate data as a response.
            res.send(data);
        })
        .catch(err => {
            // If an error is caught, send a 500 response with either a specific
            // or generic error message.
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a Avoid_Teammate."
            });
        });
};

// Get all the Avoid_Teammates from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    var condition = title ? conditionResult : null;

    Avoid_Teammate.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Avoid_Teammates."
            });
        });
};

// Get a single Avoid_Teammate from the database
exports.findOne = (req, res) => {

    Avoid_Teammate.findAll({where: {studentId : req.params.id} })
        
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(501).send({
                message: "Error retrieving Avoid_Teammate with id=" + id
            });
        });
};

// Update a single Avoid_Teammate via its ID
exports.update = (req, res) => {
    const id = req.params.id;

    Avoid_Teammate.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Avoid_Teammate was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Avoid_Teammate with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Avoid_Teammate with id=" + id
        });
    });
};

// Delete a Avoid_Teammate via its ID
exports.delete = (req, res) => {
    console.log("ID: " + req.params.id)
    const id = req.params.id;

    Avoid_Teammate.destroy({
        where: { studentId : req.params.id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Avoid_Teammate was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Avoid_Teammate with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    });
};

// Delete all Avoid_Teammates from the DB
// Probably don't want this functionality for anything.
exports.deleteAll = (req, res) => {

};

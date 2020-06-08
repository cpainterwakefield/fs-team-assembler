const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and save a new User table
exports.create = (req, res) => {
    if (!req.body.name) {
        // If there is no name, then there's no point in storing a User.
        res.status(400).send({
            message: "Content cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const user = {
        name: req.body.name,
        email: req.body.contact_email,
    };

    // Create a user from the JSON object client.
    User.create(user)
        .then(data => {
            // Send the actual user data as a response.
            res.send(data);
        })
        .catch(err => {
            // If an error is caught, send a 500 response with either a specific
            // or generic error message.
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a User."
            });
        });
};


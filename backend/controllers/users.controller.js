const db = require("../models");
const User = db.users;
const Student = db.students;
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
        email: req.body.email,
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
//Delete singular student from the db with id given in params
exports.delete = (req, res) => {
    const uID = req.params.id;
    console.log(req.params.id);
    console.log(uID);
    console.log("why");
    User.destroy({
        where: { id: uID }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${uID}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + uID
        });
    });
};

// Delete all Clients from the DB
// Probably don't want this functionality for anything.
exports.deleteStudents = (req, res) => {
    User.destroy({
        where: {is_admin: false}
    })
    .then(num => {
        res.send({
            message: "Student users deleted successfully."
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete student users."
        });
    });
};

//Send User id from an email
exports.retrieve = (req, res) => {
    var mail = req.params.email;
    console.log(mail);
    User.findOne({
        where: {
            email: mail
        }
    })
    .then((foundUser) => {
        var id = foundUser.id;
        console.log(id);
        res.send({id})
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete students"
        });
    });
}


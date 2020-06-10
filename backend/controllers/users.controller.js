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
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
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
        if (num == 1) {
            res.send({
                message: "User was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};

//Send User id from an email
exports.retrieve = (req, res) => {
    var givenID = req.params.id;
    Student.findOne({
        where: {
            id: givenID
        }
    }).then((studentFound)){
        var mail = studentFound.email;
        User.findOne({
            where: {
                email: mail
            }
        })
        .then((foundUser) => {
            res.send({id: foundUser.id})
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete students"
            });
        });
    }
}


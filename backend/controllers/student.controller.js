const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and save a new Student table
/*
Json
id: int
name: String
username: String
project_id: int
*/

exports.create = (req, res) => {
    if (!req.body.name) {
        // If there is no name, then there's no point in storing a Student.
        res.status(400).send({
            message: "Name cannot be empty."
        });

        // Don't create anything.
        return;
    }
    if (!req.body.email) {
        // If there is no name, then there's no point in storing a Client.
        res.status(400).send({
            message: "Username cannot be empty."
        });

        // Don't create anything.
        return;
    }

    const student = {
        name: req.body.name,
        username: req.body.username,
        contact_email: req.body.contact_email,
        company_name: req.body.company_name,
        gpa: req.body.gpa,
        minor: req.body.minor,
        experience: req.body.experience,
        email: req.body.email,
        projectId: req.body.projectId,

    };

    // Create a Student from the JSON object client.
    Student.create(student)
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

// Get all the Student from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    // let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    // var condition = title ? conditionResult : null;

    Student.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students."
            });
        });
};

// Get a single Student from the database using id given by shibboleth
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// Update a single Client via its ID
exports.update = (req, res) => {
    const id = req.params.id;
    //UPDATE STUDENT DATA BELOW
    Student.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student was updated successfully."
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

// Delete a Student via its ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
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

// Delete all Students from the DB
// Probably don't want this functionality for anything.
exports.deleteAll = (req, res) => {
    Student.destroy({where: {}})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Students were deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete students.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete students"
        });
    });

};

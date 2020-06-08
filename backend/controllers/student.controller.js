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
        gpa: req.body.gpa,
        minor: req.body.minor,
        experience: req.body.experience,
        email: req.body.email,
        project_id: req.body.project_id,
        first_project: req.body.first_project,
        second_project: req.body.second_project,
        third_project: req.body.third_project,
        selection_preference: req.body.selection_preference

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
                    err.message || "Some error occurred while creating a Student."
            });
        });
};

// Get all the Student from the database
exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    var condition = title ? conditionResult : null;

    Student.findAll({order: ['name']})
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

// Count all the Students from the database
exports.countAll = (req, res) => {
//    const title = req.query.title;
//-- query to receive total numbe of students
//SELECT COUNT(*) FROM students;

    Student.count()
        .then(data => {
            res.send({data})
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while counting students"
            });
        })
}

// Count all students with selection preference team
exports.countTeam = (req, res) => {

//--query to receive total number of students who preferred team
//SELECT COUNT(*) FROM students WHERE selection_preference = true;
    
    Student.count({where: {'selection_preference' : true } })
        .then(data => {
            res.send({data})
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students with selection team"
            })
        })
}

// Count all students with selection preference project 
exports.countProj = (req, res) => {

//--query to receive total number of students who preferred team
//SELECT COUNT(*) FROM students WHERE selection_preference = false;
    
    Student.count({where: {'selection_preference' : false } })
        .then(data => {
            res.send({data})
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students with selection project"
            })
        })
}

// Count all students with selection preference neither 
exports.countNoPref = (req, res) => {

//--query to receive total number of students who preferred team
//SELECT COUNT(*) FROM students WHERE selection_preference = false;
    
    Student.count({where: {'selection_preference' : null } })
        .then(data => {
            res.send({data})
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students with selection no preference"
            })
        })
}

// Count all students with selection preference neither 
exports.countSubmitted = (req, res) => {

//--query to receive total number of students who preferred team
//SELECT COUNT(*) FROM students WHERE gpa IS NOT NULL;
    
    Student.count({where: {'gpa' : { [Op.not] : null} } })
        .then(data => {
            res.send({data})
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students with selection no preference"
            })
        })
}

exports.countProjInPref = (req, res) => {

//-- query to receive number of students who preferred project AND got a preferred project
//SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = first_project OR project_id = second_project OR project_id = third_project);
    db.sequelize.query("SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = first_project OR project_id = second_project OR project_id = third_project)", { type: db.sequelize.SELECT })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students"
            })
        })
}

exports.countFirstProj = (req, res) => {

//-- query to receive number of students who preferred project AND got their first project 
//SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = first_project);
    db.sequelize.query("SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = first_project)" , {type: db.sequelize.SELECT })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students"
            })
        })
}

exports.countSecondProj = (req, res) => {

//-- query to receive number of students who preferred project AND got their second project 
//SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = second_project);
    db.sequelize.query("SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = second_project)" , {type: db.sequelize.SELECT })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students"
            })
        })
}

exports.countThirdProj = (req, res) => {

//-- query to receive number of students who preferred project AND got their third project 
//SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = third_project);
    db.sequelize.query("SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = third_project)" , {type: db.sequelize.SELECT })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students"
            })
        })
}

exports.countTeam1Mem = (req, res) => {

//-- query to receive number of students who preferred project AND got their third project 
//SELECT COUNT(*) FROM students s WHERE selection_preference = true AND EXISTS (SELECT 1 FROM prefer_teammate_xrefs ptx WHERE ptx.student_id = s.id AND ptx.preferree_id IN (SELECT s2.id FROM students s2 WHERE s2.id != s.id AND s2.project_id = s.project_id));
    db.sequelize.query("SELECT COUNT(*) FROM students s WHERE selection_preference IS NULL AND ((project_id = first_project OR project_id = second_project OR project_id = third_project) OR EXISTS (SELECT 1 FROM prefer_teammate_xrefs ptx WHERE ptx.student_id = s.id AND ptx.preferree_id IN (SELECT s2.id FROM students s2 WHERE s2.id != s.id AND s2.project_id = s.project_id)))" , {type: db.sequelize.SELECT })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students"
            })
        })
}

exports.countNoPrefTeamOrProj = (req, res) => {

//-- query to receive number of students who preferred project AND got their third project 
//SELECT COUNT(*) FROM students s WHERE selection_preference = true AND EXISTS (SELECT 1 FROM prefer_teammate_xrefs ptx WHERE ptx.student_id = s.id AND ptx.preferree_id IN (SELECT s2.id FROM students s2 WHERE s2.id != s.id AND s2.project_id = s.project_id));
    db.sequelize.query("SELECT COUNT(*) FROM students s WHERE selection_preference = true AND EXISTS (SELECT 1 FROM prefer_teammate_xrefs ptx WHERE ptx.student_id = s.id AND ptx.preferree_id IN (SELECT s2.id FROM students s2 WHERE s2.id != s.id AND s2.project_id = s.project_id))" , {type: db.sequelize.SELECT })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while counting students"
            })
        })
}

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

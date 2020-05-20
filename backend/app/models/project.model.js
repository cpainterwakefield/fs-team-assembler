const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        name: {
            type: Sequelize.STRING
        },

        description: {
            type: Sequelize.STRING
        },

        advisorId: {
            type: Sequelize.INTEGER
        },

        clientId: {
            type: Sequelize.INTEGER
        },

        minStudents: {
            type: Sequelize.INTEGER
        },

        maxStudents: {
            type: Sequelize.INTEGER
        }
    });

    return Project;
};
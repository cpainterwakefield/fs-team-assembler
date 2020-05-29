const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        name: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },

        description: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },

        advisorId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        clientId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        minStudents: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        maxStudents: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
    });

    return Project;
};
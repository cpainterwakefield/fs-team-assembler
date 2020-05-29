const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },

        description: {
            type: Sequelize.STRING,
            allowNull: true
        },

        advisor_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        client_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        min_students: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        max_students: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Project;
};
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

        advisor_Id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        client_Id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        min_Students: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        max_Students: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
    });

    return Project;
};
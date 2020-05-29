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

        advisor_Id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        client_Id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        min_Students: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        max_Students: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Project;
};
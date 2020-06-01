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
            allowNULL: false
        },

        client_name: {
            type: Sequelize.STRING,
            allowNull: true
        },

        client_email: {
            type: Sequelize.STRING,
            allowNull: true
        },

        client_company: {
            type: Sequelize.STRING,
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
    Project.associate = function(models) {
        //declare associations here
        Project.hasOne(models.advisor, {
            foreignKey: 'advisor_id',
            as: 'advisor'
        });
    }

    return Project;
};

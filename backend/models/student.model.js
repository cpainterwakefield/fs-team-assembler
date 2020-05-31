const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },

        username: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },

        project_id: {
            type: Sequelize.BOOLEAN,
            defaultValue: null,
            allowNull: true
        },
        gpa: {
            type: Sequelize.DECIMAL(3),
            defaultValue: null,
            allowNull: true

        }
    });

    return Student;
};
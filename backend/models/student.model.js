const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING
        },

        username: {
            type: Sequelize.STRING
        },

        projectId: {
            type: Sequelize.BIGINT
        }
    });

    return Student;
};
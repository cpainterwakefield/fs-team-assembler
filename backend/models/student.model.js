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

<<<<<<< HEAD
        projectId: {
            type: Sequelize.INTEGER,
=======
        project_id: {
            type: Sequelize.BOOLEAN,
>>>>>>> 86b77ea1743d1f487ae9c825d7733cd9f13f6841
            defaultValue: null,
            allowNull: true
        },
        gpa: {
            type: Sequelize.DECIMAL(3),
            defaultValue: null,
            allowNull: true
        },

        // EDITED BELOW BY Michael -- can be reverted if needed
        minor: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },

        experience: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
      
        email: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        }
      
    });

    return Student;
};

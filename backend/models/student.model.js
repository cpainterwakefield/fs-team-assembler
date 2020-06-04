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

        selection_preference: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },

        gpa: {
            type: Sequelize.DECIMAL(10,3),
            defaultValue: null,
            allowNull: true
        },
        
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
            allowNull: false
        },
     /*   first_project: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }, 

        second_project: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }, 
    
        third_project: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }, 
   */ });
    Student.associate = function(models) {
        //declare associations here
        Student.hasMany(models.prefer_teammate,{
            foreignKey: 'preferrer_id',
            allowNull: true,
            defaultValue: null,
        });
        Student.hasMany(models.prefer_teammate,{
            foreignKey: 'preferree_id',
            allowNull: true,
            defaultValue: null,
        });
        Student.hasMany(models.avoid_teammate,{
            foreignKey: 'avoider_id',
            allowNull: true,
            defaultValue: null,
        });
        Student.hasMany(models.avoid_teammate,{
            foreignKey: 'avoidee_id',
            allowNull: true,
            defaultValue: null,
        });
   }

    return Student;
};

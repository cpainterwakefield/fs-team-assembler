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
        project_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
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
            allowNull: true
        },
/*      
        first_project: {
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
  */    
    });
/*    Student.associate = function(models) {
        //declare associations here
//        Student.belongsTo(models.projects, {
//            foreignKey: 'id',
//            as: 'project_id'
//        });
        Student.belongsTo(models.projects,{
            foreignKey: 'id',
            as: 'first_project'
        });
        Student.belongsTo(models.projects,{
            foreignKey: 'id',
            as: 'second_project'
        })
        Student.belongsTo(models.projects,{
            foreignKey: 'id',
            as: 'third_project'
        })
    }
*/
    return Student;
};

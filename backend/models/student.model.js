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
      });
    Student.associate = function(models) {
        //declare associations here
/*        Student.hasMany(models.prefer_teammate,{
            type: Sequelize.INTEGER,
            allowNull: false,
            as: 'preferrer_id',
            foreignKey: {
                as: 'preferrer_id',
                primaryKey: true
            }
        });
        Student.hasMany(models.prefer_teammate,{
            type: Sequelize.INTEGER,
            allowNull: false,
            as: 'preferree_id',
            foreignKey: {
                as: 'preferree_id',
                primaryKey: true
            }
        });*/     
        Student.belongsToMany(Student, {as: 'preferree', through: 'prefer_teammate_xrefs'})
        Student.belongsToMany(Student, {as: 'avoidee', through: 'avoid_teammate_xrefs'})

   }

//        queryInterface.addConstraint('prefer_teammate_xref', ['preferrer_id', 'preferree_id'], {
//          type: 'primary key',
///          name: 'gametag_pkey'
//        });
    return Student
}

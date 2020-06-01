const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const AvoidTeammateXref = sequelize.define("avoid_teammate_xref", {
        avoider_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        avoidee_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
    });
    AvoidTeammateXref.associates = function(models) {
        //declare associates here
        AvoidTeammateXref.hasOne(models.students, {
            foreignKey: 'avoider_id',
            as: 'Student'
        });
        AvoidTeammateXref.hasMany(models.students, {
            foreignKey: 'avoidee_id',
            as: 'AvoidedStudent'
        })
    }

    return AvoidTeammateXref;
};
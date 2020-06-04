const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferProjectXref = sequelize.define("prefer_project_xref", {
        /*
        preferrer_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        project_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
        */
    });
    PreferProjectXref.associates = function(models) {
        //declare associates here
        PreferProjectXref.hasOne(models.students, {
            foreignKey: 'id',
            as: "preferrer_id"
        });
        PreferProjectXref.hasMany(models.projects, {
            foreignKey: 'id',
            as: "project_id"
        })
    }

    return PreferProjectXref;
};
const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferTeammateXref = sequelize.define("prefer_teammate_xref", {
        /*
        preferrer_id: {
            type: Sequelize.INTEGER
        },

        preferree_id: {
            type: Sequelize.INTEGER
        }
        */
    });
    PreferTeammateXref.associate = function(models) {
        //declare associations here
        PreferTeammateXref.hasOne(models.students, {
            foreignKey: 'preferrer_id',
            as: 'Student'
        });
        PreferTeammateXref.hasMany(models.students, {
            foreignKey: 'preferree_id',
            as: 'prefStudent'
        })
    }

    return PreferTeammateXref;
};
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
            foreignKey: 'id',
            as: 'preferrer_id'
        });
        PreferTeammateXref.hasMany(models.students, {
            foreignKey: 'id',
            as: 'preferree_id'
        })
    }

    return PreferTeammateXref;
};
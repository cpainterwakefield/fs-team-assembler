const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const AvoidTeammateXref = sequelize.define("avoid_teammate_xref", {
        avoider_id: {
            type: Sequelize.INTEGER,
            references: 'student',
            referencesKey: 'id',
            defaultValue: null,
            allowNull: true
        },

        avoidee_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            references: 'student',
            referencesKey: 'id',
            allowNull: true
        }
    });

    return AvoidTeammateXref;
};
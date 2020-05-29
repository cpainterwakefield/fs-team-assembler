const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const AvoidTeammateXref = sequelize.define("AvoidTeammateXref", {
        avoiderId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        avoideeId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
    });

    return AvoidTeammateXref;
};
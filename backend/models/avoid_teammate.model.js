const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const AvoidTeammateXref = sequelize.define("AvoidTeammateXref", {
        avoiderId: {
            type: Sequelize.INTEGER
        },

        avoideeId: {
            type: Sequelize.INTEGER
        }
    });

    return AvoidTeammateXref;
};
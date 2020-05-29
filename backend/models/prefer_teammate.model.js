const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferTeammateXref = sequelize.define("PreferTeammateXref", {
        preferrerId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        preferreeId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
    });

    return PreferTeammateXref;
};
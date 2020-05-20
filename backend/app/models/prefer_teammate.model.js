const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferTeammateXref = sequelize.define("PreferTeammateXref", {
        preferrerId: {
            type: Sequelize.INTEGER
        },

        preferreeId: {
            type: Sequelize.INTEGER
        }
    });

    return PreferTeammateXref;
};
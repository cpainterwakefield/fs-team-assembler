const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferProjectXref = sequelize.define("PreferProjectXref", {
        preferrerId: {
            type: Sequelize.INTEGER
        },

        projectId: {
            type: Sequelize.INTEGER
        }
    });

    return PreferProjectXref;
};
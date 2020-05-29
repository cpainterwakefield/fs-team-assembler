const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferProjectXref = sequelize.define("PreferProjectXref", {
        preferrerId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },

        projectId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        }
    });

    return PreferProjectXref;
};
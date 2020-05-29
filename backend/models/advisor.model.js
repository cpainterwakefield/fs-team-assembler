const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Advisor = sequelize.define("advisor", {
        name: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },

        username: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
    });

    return Advisor;
};
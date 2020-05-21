const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Advisor = sequelize.define("advisor", {
        name: {
            type: Sequelize.STRING
        },

        username: {
            type: Sequelize.STRING
        },
    });

    return Advisor;
};
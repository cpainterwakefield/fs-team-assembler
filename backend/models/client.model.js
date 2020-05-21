const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        name: {
            type: Sequelize.STRING
        },
    });
    return Client;
};
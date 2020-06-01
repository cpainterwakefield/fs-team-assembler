const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Advisor = sequelize.define("advisor", {
        //Advisor only needs ID which sequelize does by default
    });

    return Advisor;
};
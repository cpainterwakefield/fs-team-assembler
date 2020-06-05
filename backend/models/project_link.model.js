const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project_link", {
        link: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Project;
};

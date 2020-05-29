const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("student", {
        name: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        auth_id: {
            type: Sequelize.BIGINT,
            defaultValue: null,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        isAdmin: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        }

    });

    return User;
};
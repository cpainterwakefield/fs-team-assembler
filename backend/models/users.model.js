const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        auth_id: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    });

    return User;
};

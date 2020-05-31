const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferProjectXref = sequelize.define("prefer_project_xref", {
        preferrer_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            references: 'student',
            referencesKey: 'id',
            allowNull: true
        },

        project_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            references: 'project',
            referencesKey: 'id',
            allowNull: true
        }
    });

    return PreferProjectXref;
};
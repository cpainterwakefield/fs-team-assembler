const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferTeammateXref = sequelize.define("prefer_teammate_xref", {
        preferrer_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            references: 'student',
            referencesKey: 'id',
            allowNull: true
        },

        preferree_id: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            references: 'student',
            referencesKey: 'id',
            allowNull: true
        }
    });

    return PreferTeammateXref;
};
const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PreferTeammateXref = sequelize.define("prefer_teammate_xrefs", {
      /*  
        preferrer_id: {
            type: Sequelize.INTEGER
        },

        preferree_id: {
            type: Sequelize.INTEGER
        }
        */
    })
/*    PreferTeammateXref.associate = function(models) {
       //declare associations here
        PreferTeammateXref.belongsTo(models.students, {
            foreignKey: 'preferrer_id',
            targetKey: 'preferrer_id'
       
        });
        PreferTeammateXref.belongsTo(models.students, {
            type: Sequelize.INTEGER,
            foreignKey: {
                as: 'preferree_id',
                primaryKey: true
            }
        });
    }*/
    PreferTeammateXref.removeAttribute('id');
   return PreferTeammateXref;
};


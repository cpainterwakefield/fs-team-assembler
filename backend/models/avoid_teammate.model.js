const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const AvoidTeammateXref = sequelize.define("avoid_teammate_xrefs", {
      /*  
        avoidrer_id: {
            type: Sequelize.INTEGER
        },

        avoidree_id: {
            type: Sequelize.INTEGER
        }
        */
    })
/*    AvoidTeammateXref.associate = function(models) {
       //declare associations here
        AvoidTeammateXref.belongsTo(models.students, {
            foreignKey: 'avoidrer_id',
            targetKey: 'avoidrer_id'
       
        });
        AvoidTeammateXref.belongsTo(models.students, {
            type: Sequelize.INTEGER,
            foreignKey: {
                as: 'avoidree_id',
                primaryKey: true
            }
        });
    }*/
    AvoidTeammateXref.removeAttribute('id');
   return AvoidTeammateXref;
};


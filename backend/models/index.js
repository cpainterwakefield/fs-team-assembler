const dbConfig = require("../config/db.config.js");

const Sequelize = require('sequelize');
//Create instance of sequelize using config file
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    define: {
        underscored: true,
    timestamps: false
    },

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        aquire: dbConfig.pool.aquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//ADD THESE BECAUSE 
db.clients = require("./client.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);
db.advisor = require("./advisor.model.js")(sequelize, Sequelize);
db.prefer_teammate = require("./prefer_teammate.model.js")(sequelize, Sequelize);
db.avoid_teammate = require("./avoid_teammate.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.avoid_teammate = require("./avoid_teammate.model.js")(sequelize, Sequelize);
db.project_link = require("./project_link.model.js")(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;

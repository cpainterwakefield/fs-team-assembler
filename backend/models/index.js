const dbConfig = require("../config/db.config.js");

const Sequelize = require('sequelize');
//Create instance of sequelize using config file
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

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
db.projects = require("./project.model.js")(sequelize,Sequelize);
db.prefer_teammate = require("./prefer_teammate.model.js")(sequelize, Sequelize);
db.prefer_project = require("./prefer_project.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.avoid_teammate = require("./avoid_teammate.model")(sequelize, Sequelize);

module.exports = db;

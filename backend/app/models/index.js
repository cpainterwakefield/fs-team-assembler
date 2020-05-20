const dbConfig = require("../../config/db.config.js");

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

db.advisors = require("./advisor.model.js")(sequelize, Sequelize);
db.avoid_teammates = require("./avoid_teammate.model.js")(sequelize, Sequelize);
db.clients = require("./client.model.js")(sequelize, Sequelize);
db.prefer_projects = require("./prefer_project.model.js")(sequelize, Sequelize);
db.prefer_teammates = require("./prefer_teammate.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);

module.exports = db;

module.exports = {
    HOST: "127.0.0.1",
    USER: "postgres",
    PASSWORD: "UwU",
    DB: "somedb",
    dialect: "postgres",
    pool:{
        //Max num of connections in pool
        max: 69,
        //Min num of connections in pool
        min: 0,
        //Max time in milliseconds that pool will try to get connection before an error
        //is thrown
        aquire: 30000,
        //max time in milliseconds that a connection can be idle before being released
        idle: 10000
    }

}
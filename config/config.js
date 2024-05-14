require('dotenv').config()
module.exports = {
    development: {
        "username" : process.env.PGUSER_DEV,
        "password" : process.env.PGPASSWORD_DEV,
        "database" : process.env.PGDATABASE_DEV,
        "host" : process.env.PGHOST_DEV,
        "port" : process.env.PGPORT_DEV,
        "dialect" : "postgres",
        // "username" : "postgres",
        // "password" : "admin",
        // "database" : "cctv",
        // "host" : "127.0.0.1",
        // "dialect" : "postgres",
    },
    test: {
        "username" : process.env.PGUSER_TEST,
        "password" : process.env.PGPASSWORD_TEST,
        "database" : process.env.PGDATABASE_TEST,
        "host" : process.env.PGHOST_TEST,
        "dialect" : process.env.PGDIALECT_TEST,
    },
    production: {
        "username" : process.env.PGUSER,
        "password" : process.env.PGPASSWORD,
        "database" : process.env.PGDATABASE,
        "host" : process.env.PGHOST,
        "port" : process.env.PGPORT,
        "dialect" : "postgres",
    }
}
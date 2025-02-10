require('dotenv').config()
module.exports = {
    development: {
        // "username" : process.env.PGUSER,
        // "password" : process.env.PGPASSWORD,
        // "database" : process.env.PGDATABASE,
        // "host" : process.env.PGHOST,
        // "port" : process.env.PGPORT,
        // "dialect" : "postgres",

        "username" : "postgres",
        "password" : "admin",
        "database" : "cctvdev",
        "host" : "127.0.0.1",
        "dialect" : "postgres",
    },
    test: {
        "username" : "postgres",
        "password" : "admin",
        "database" : "cctv_test",
        "host" : "127.0.0.1",
        "dialect" : "postgres",
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
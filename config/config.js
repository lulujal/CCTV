require('dotenv').config()
module.exports = {
    development: {

        // // CCTV SUPABASE rekayasa 20 CCTV
        // "username" : process.env.PGUSER,
        // "password" : process.env.PGPASSWORD,
        // "database" : process.env.PGDATABASE,
        // "host" : process.env.PGHOST,
        // "port" : process.env.PGPORT,
        // "dialect" : "postgres",

        // CCTV SUPERCLUSTER SUPABASE
        "username" : process.env.PGUSER_DEV0,
        "password" : process.env.PGPASSWORD_DEV0,
        "database" : process.env.PGDATABASE_DEV0,
        "host" : process.env.PGHOST_DEV0,
        "port" : process.env.PGPORT_DEV0,
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
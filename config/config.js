require('dotenv').config()
module.exports = {
    development: {
        "username" : process.env.PGUSER,
        "password" : process.env.PGPASSWORD,
        "database" : process.env.PGDATABASE,
        "host" : process.env.PGHOST,
        "dialect" : process.env.PGDIALECT,
    },
    test: {
        "username" : process.env.PGUSER_TEST,
        "password" : process.env.PGPASSWORD_TEST,
        "database" : process.env.PGDATABASE_TEST,
        "host" : process.env.PGHOST_TEST,
        "dialect" : process.env.PGDIALECT_TEST,
    },
    production: {
        "username" : process.env.PGUSER_PROD,
        "password" : process.env.PGPASSWORD_PROD,
        "database" : process.env.PGDATABASE_PROD,
        "host" : process.env.PGHOST_PROD,
        "dialect" : process.env.PGDIALECT_PROD,
    }
}
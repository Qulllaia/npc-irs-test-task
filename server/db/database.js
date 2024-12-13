const pg = require('pg-promise')()

const db = pg({
    host: 'localhost',
    database: 'book_shop',
    port: 5432,
    user: 'postgres',
    password: 'qulllaia'
})
module.exports = db;
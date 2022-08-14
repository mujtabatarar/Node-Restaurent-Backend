const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password:"03334423909",
    host: "localhost",
    port: "5432",
    database: "RestaurentApp"
});
module.exports = pool;
const mysql = require("mysql");

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_mysql',
});
pool.connect((err) => {
    err ? console.log(err) : console.log("Database connected");
});

module.exports = pool;
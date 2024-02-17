
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: '3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10,
}

const pool = mysql.createPool(config);

pool.getConnection()
.then(connection => {
    console.log('Connected to the database')
    connection.release();
}).catch(err => {
    console.log('Failed to connect to the database', err.message);
    process.exit(1);
});

module.exports = pool;


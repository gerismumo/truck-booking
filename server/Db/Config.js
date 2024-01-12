const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

const pool = () => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to database', err.message);
          reject(err);
          return;
        }
  
        console.log('Connected to the database');
        connection.release();
        resolve();
      });
    });
  };


module.exports = pool;

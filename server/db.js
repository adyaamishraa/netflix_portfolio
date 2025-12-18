const {Pool} = require('pg');
require('dotenv').config(); 

console.log('DB_USER:', process.env.DB_USER);        // should print 'postgres'
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // should print your password

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
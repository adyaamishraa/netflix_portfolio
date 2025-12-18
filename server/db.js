const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.DATABASE_URL) {
  // Production on Render
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for Render
  });
} else {
  // Local development
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
}

// Optional: test connection
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected!"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;



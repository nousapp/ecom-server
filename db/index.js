require('dotenv').config();
const pg = require('pg');

// pick variables from env
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
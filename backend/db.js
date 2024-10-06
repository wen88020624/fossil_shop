// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 8080,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

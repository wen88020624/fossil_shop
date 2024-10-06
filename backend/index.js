// index.js
const express = require('express');
const db = require('./db');

const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

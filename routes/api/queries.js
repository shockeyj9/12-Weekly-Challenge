const router = require('express').Router();
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
);


//GET ROUTE -- URL: '/api/query'
router.get('/:tableName', (req, res) => {
  const queryTable = req.params.tableName;
    const sql = `SELECT * FROM ??`;
    db.query(sql, queryTable, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
           return;
        }
        res.json({
          message: 'success',
          data: rows
        });
      });
});

module.exports = router; 
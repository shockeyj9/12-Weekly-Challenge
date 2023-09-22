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
//get all rows from specific table
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

//get specific column from table
router.get('/:columnName/:tableName', (req, res) => {
  const queryTable = req.params.tableName;
  const queryColumn = req.params.columnName;
    const sql = `SELECT ?? FROM ??`;
    db.query(sql, [queryColumn,queryTable], (err, rows) => {
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

//Add department ---NOT READY FOR TESTING 
router.post('/department', (req, res) => {

    const sql = `INSERT INTO department (name) VALUES ("Accounting")`;
    db.query(sql, (err, rows) => {
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
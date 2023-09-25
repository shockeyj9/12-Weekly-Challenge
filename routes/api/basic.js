const router = require('express').Router();
const {db} = require('./connection');
// require('dotenv').config();


//get specific column from table
router.get('/role', (req, res) => {
      const sql = `SELECT title FROM role`;
      db.query(sql,  (err, rows) => {
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


router.get('/department', (req, res) => {
      const sql = `SELECT name FROM department`;
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


router.get('/employee', (req, res) => {
    const sql = `select CONCAT(first_name,' ',last_name) from employee`;
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
const router = require('express').Router();
const {db} = require('./connection');
require('dotenv').config();

router.delete('/role/:dept', (req, res) => {
    const role_name = req.params.dept;
    const sql = `DELETE FROM role WHERE name like "${role_name}"; `;
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


router.delete('/employee/:emp', (req, res) => {
    const emp_name = req.params.emp;
    const sql = `DELETE FROM employee WHERE  CONCAT(first_name,' ',last_name) like "${emp_name}"; `;
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

router.delete('/department/:dept', (req, res) => {
    const dept_name = req.params.dept;
    const sql = `DELETE FROM department WHERE name like "${dept_name}"; `;
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
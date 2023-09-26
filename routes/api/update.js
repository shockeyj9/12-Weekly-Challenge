const router = require('express').Router();
const {db} = require('./connection');
require('dotenv').config();

router.put('/emprole', (req, res) => {
    const role = req.body.new_role;
    const emp_name = req.body.employee;
    const sql = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title LIKE "${role}") WHERE CONCAT(first_name,' ',last_name) like "${emp_name}"`;
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

router.put('/empmanager', (req, res) => {
  const manager = req.body.new_manager;
  const emp_name = req.body.employee;
  console.log(manager,emp_name)
  const sql = `UPDATE employee SET manager_id = (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) LIKE "${manager}") WHERE CONCAT(first_name,' ',last_name) like "${emp_name}"`;
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

module.exports = router;
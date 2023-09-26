const router = require('express').Router();
const {db} = require('./connection');
require('dotenv').config();

//get specific column from table
router.post('/department', (req, res) => {
    const department_name = req.body.dept_name;

    const sql = `INSERT INTO department (name) VALUES ("${department_name}");`;
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

//get specific column from table
router.post('/role', (req, res) => {
    const dept_name = req.body.dept_name;
    const title = req.body.title;
    const salary = req.body.salary;
    const sql = `INSERT INTO role (title,salary,department_id) SELECT "${title}", ${salary}, d.id FROM department d WHERE d.name like "${dept_name}"`;
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

//get specific column from table
router.post('/employee', (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const role = req.body.emp_role;
    const manager = req.body.emp_manager;
    const sql = `INSERT INTO employee (first_name,last_name,role_id, manager_id) SELECT "${firstName}", "${lastName}",(SELECT id FROM role WHERE title like "${role}" ), (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) like "${manager}" ) from DUAL`;
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
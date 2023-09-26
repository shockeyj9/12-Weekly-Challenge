const router = require('express').Router();
const {db} = require('./connection');
require('dotenv').config();

//get specific column from table
router.get('/departments', (req, res) => {
      const sql = `SELECT * FROM department`;
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


router.get('/roles', (req, res) => {
    const sql = `select r.id, r.title, d.name AS dept_name, r.salary FROM role r left JOIN department d ON d.id=r.department_id `;
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

router.get('/employees', (req, res) => {
    const sql = `SELECT e.id, e.first_name,e.last_name,r.title, d.name as dept_name, CONCAT(e2.first_name," ",e2.last_name) as manager, r.salary from employee e left JOIN role r on r.id=e.role_id left join department d on r.department_id=d.id left join employee e2 on e.manager_id=e2.id;`;
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
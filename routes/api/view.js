const router = require('express').Router();
const {db} = require('./connection');
require('dotenv').config();

//get specific column from table
router.get('/empbymanager/:managers', (req, res) => {
    const manager = req.params.managers
    const sql = `SELECT CONCAT(e.first_name,' ',e.last_name) AS employee FROM employee e JOIN employee e2 ON e.manager_id = e2.id WHERE CONCAT(e2.first_name, ' ', e2.last_name) like '${manager}';`;
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

//get specific column from table
router.get('/empbydept/:dept', (req, res) => {
    const department = req.params.dept
    const sql = `SELECT CONCAT(e.first_name," ",e.last_name) AS employee FROM employee e JOIN role r on e.role_id = r.id JOIN department d ON d.id=r.department_id WHERE d.name like "${department}"`
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
//get specific column from table
router.get('/budget/:dept', (req, res) => {
    const department =  req.params.dept
    const sql =    `SELECT sum(r.salary) sum_of_salaries FROM role r JOIN employee e ON e.role_id=r.id JOIN department d ON r.department_id = d.id GROUP by d.name HAVING d.name like "${department}";`
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
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
  let sql; 
  const queryTable = req.params.tableName;
  if (queryTable=='department'){
    sql = `SELECT * FROM ${queryTable}`;
  }else if (queryTable=='role'){
    sql = `SELECT r.id, r.title, d.name as Dept_Name, r.salary FROM role r JOIN department d ON d.id = r.department_id`
  }else if (queryTable=='employee'){
    sql = `SELECT e.id, e.first_name,e.last_name,r.title, d.name as dept_name, CONCAT(e2.first_name," ",e2.last_name) as manager, r.salary from employee e JOIN role r on r.id=e.role_id join department d on r.department_id=d.id left join employee e2 on e.manager_id=e2.id;`
  }
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

//get manager first & last name
router.get('/:firstName/:lastName/:tableName', (req, res) => {
  const queryTable = req.params.tableName;
  const queryFName =  req.params.firstName;
  const queryLName =  req.params.lastName;
    const sql = `SELECT CONCAT(${queryFName},' ',${queryLName}) as name FROM ${queryTable}`;
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

//Add department 
router.post('/department', (req, res) => {
    const sql = `INSERT INTO department (name) VALUES ("${req.body.dept_name}")`;
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

//Add role 
router.post('/role', (req, res) => {
  const title = req.body.role_title;
  const salary = req.body.role_salary;
  const dept_name = req.body.role_dept_id;
  const sql = `INSERT INTO role (title,salary,department_id) SELECT "${title}", ${salary}, d.id FROM department d WHERE d.name like "${dept_name}" `;
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


//Add employee 
router.post('/employee', (req, res) => {

  console.log(req.body);
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const role = req.body.emp_role;
  const manager = req.body.emp_manager;

  const sql = `INSERT INTO employee (first_name,last_name,role_id, manager_id) SELECT "${firstName}", "${lastName}",(SELECT id FROM role WHERE title like "${role}" ), (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) like "${manager}" ) from DUAL`;

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

//update employee role 
router.put('/employee', (req, res) => {

  const role = req.body.new_role;
  const emp_name = req.body.employee;

  const sql = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title LIKE "${role}") WHERE CONCAT(first_name,' ',last_name) like "${emp_name}"`;

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
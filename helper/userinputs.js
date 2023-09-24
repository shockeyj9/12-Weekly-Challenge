const inquirer = require('inquirer');
const Query = require('../constructor/select');
const Table = require('nodejs-console-table');
const {getData,userChoiceArray} = require('./helpers');

function addToTable (resTable){
    let result;
    if (resTable=='department'){
        result = addDept(resTable);
    }else if (resTable=='role'){
        result = addRole(resTable);
    }else{
        result = addEmployee(resTable);
    }
  };

  async function assignRequestType(response){
    const resType = response.split(' ')[0]
    const resColumn = response.split(' ')[1]
    let resTable = response.split(' ')
    if(resType=='view'){
        resTable = resTable[resTable.length-1].slice(0,-1)
        const result = await getData(resTable);
        const table = new Table(result).table
        console.table(table);
        init();
        return result;
    }else if (resType=='add'){
        //inquirer function to get additional information
        resTable = resTable[resTable.length-1]
        addToTable(resTable);
    }else if (resType=='update'){
        //inquirer function to get additional information
        updateEmployee();
    }
}

function init (){
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: userChoiceArray,
        },
      ])
      .then((response)=>{
      assignRequestType(response.action);
        // return result;
      })
    //   .then(()=> init())
  };

  function addDept (resTable){
    inquirer
    .prompt([
      {
        type: 'input',
        message: `Please type new ${resTable} name:`,
        name: 'dept_name',
      },
    ])
    .then((response)=>{
    const newQuery = new Query (resTable);
    return newQuery.createQuery(response);
    })
    .then(()=> init())
  }

async  function addRole (resTable){
    const deptObj = await getData('department', 'name');
    const deptArray = deptObj.map((dept)=>dept.name)
    inquirer
    .prompt([
      {
        type: 'input',
        message: `Please type new ${resTable}'s title:`,
        name: 'role_title',
      },
      {
        type: 'input',
        message: `Please type new ${resTable}'s salary:`,
        name: 'role_salary',
      },
      {
        type: 'list',
        message: `Please select the new ${resTable}'s department id:`,
        name: 'role_dept_id',
        choices: deptArray,
      },
    ])
    .then((response)=>{
        const newQuery = new Query (resTable);
       return newQuery.createQuery(response);
    })
    .then(()=> init())
  }

  async  function addEmployee (resTable){
    const roleObj = await getData('role', 'title');
    const roleArray = roleObj.map((role)=>role.title);
    const managerObj = await getData('employee', 'first_name', 'last_name');
    const managerArray = managerObj.map((man)=> man.name);

    inquirer
    .prompt([
      {
        type: 'input',
        message: `Please type new ${resTable}'s first name:`,
        name: 'first_name',
      },
      {
        type: 'input',
        message: `Please type new ${resTable}'s last name:`,
        name: 'last_name',
      },
      {
        type: 'list',
        message: `Please select the new ${resTable}'s role:`,
        name: 'emp_role',
        choices: roleArray,
      },
      {
        type: 'list',
        message: `Please select the new ${resTable}'s manager:`,
        name: 'emp_manager',
        choices: managerArray,
      }
      
    ])
    .then((response)=>{
        const newQuery = new Query (resTable);
        return newQuery.createQuery(response);
    })
    .then(()=> init())
  }

async  function updateEmployee (){
    const roleObj = await getData('role', 'title');
    const roleArray = roleObj.map((role)=>role.title);
    const empObj = await getData('employee', 'first_name', 'last_name');
    const empArray = empObj.map((man)=> man.name);

    inquirer
    .prompt([
      {
        type: 'list',
        message: `Please select the employee you would like to update:`,
        name: 'employee',
        choices: empArray,
      },
      {
        type: 'list',
        message: `Please select the employee's new role:`,
        name: 'new_role',
        choices: roleArray,
      },
      
    ])
    .then((response)=>{
        const newQuery = new Query ('employee','role');
        return newQuery.updateQuery(response);
    })
    .then(()=>init())
  }

  module.exports = {init}
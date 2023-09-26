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
    let resTable = response.split(' ')

    if(resTable.includes('view')){
      if(resTable.includes('all')){
        resTable = resTable[resTable.length-1]
          const newQuery = new Query (resTable);
          const result = await newQuery.initQuery();
          const table = new Table(result).table
          console.table(table);
          init();
      }else if (resTable.includes('budget')){
        budByDept();
      }else{
        byColumn = resTable[resTable.length-1]
        empBy(byColumn)
      }
    }else if (resTable.includes('add')){
        resTable = resTable[resTable.length-1]
        addToTable(resTable);
    }else if (resTable.includes('update')){
      updateCol = resTable[resTable.length-1]
        updateEmployee(updateCol); 
    }else{
      delTable = resTable[resTable.length-1]
       deleteTable(delTable);
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
      })
  };

async function empBy (resColumn){
  const managerObj = await getData(resColumn)
  const managerArr = managerObj.map((man)=>man.name)
    inquirer
      .prompt([
        {
          type: 'list',
          message: `Please select the ${resColumn}:`,
          name: resColumn,
          choices: managerArr,
        },
      ])
      .then(async (response)=>{
        if (resColumn=='manager'){
          const newQuery = new Query ('empbymanager');
          const result = await newQuery.viewQuery(response.manager); 
          const table = new Table(result).table;
          return console.log(table);
        }else{
          const newQuery = new Query ('empbydept');
          const result = await newQuery.viewQuery(response.department); 
          const table = new Table(result).table;
          return console.log(table);
        }
      })
    .then(()=> init())
  };

async function budByDept (){
    const deptObj = await getData('department')
    const deptArr = deptObj.map((man)=>man.name)
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Please select the department:',
          name: 'dept',
          choices: deptArr,
        },
      ])
      .then(async (response)=>{
        const newQuery = new Query ('budget');
        const result = await newQuery.viewQuery(response.dept); 
        const table = new Table(result).table;
        return console.log(table);
      })
      .then(()=> init())
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

async  function updateEmployee (updateCol){
  let roleArray;
    if (updateCol=='role'){
      const roleObj = await getData('role');
       roleArray = roleObj.map((col)=>col.title);
    }else{
      const roleObj = await getData('employee');
       roleArray = roleObj.map((col)=>col.name);
    }
    const empObj = await getData('employee');
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
        message: `Please select the employee's new ${updateCol}:`,
        name: `new_${updateCol}`,
        choices: roleArray,
      },
      
    ])
    .then((response)=>{
      //BROKEN CAN'T GET UPDATE TO WORK
        const newQuery = new Query (updateCol);
        return newQuery.updateQuery(response);
    })

  }

  async  function deleteTable (delTable){
    const tableObj = await getData(delTable);
    let tableArray
    if (delTable=='role'){
      tableArray= tableObj.map((role)=>role.title);
    }else{
      tableArray= tableObj.map((role)=>role.name);
    }
      inquirer
      .prompt([
        {
          type: 'list',
          message: `Please select the ${delTable} you would like to delete:`,
          name: "type",
          choices: tableArray,
        },
        
      ])
      .then((response)=>{
          const newQuery = new Query (delTable);
          return newQuery.deleteQuery(response.type);
      })
      .then(()=>init())
  
    }

  module.exports = {init}
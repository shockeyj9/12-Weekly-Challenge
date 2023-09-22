const inquirer = require('inquirer');
const {userChoiceArray,assignRequestType} = require('./helper/helpers')


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
    // .then(()=> init());
};

function addToTable (){
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please type new department name:',
        name: 'dept_name',
      },
    ])
    .then((response)=>{
      console.log(response);
      // createQuery(response);
    })
    // .then(()=> init());
};



module.exports = {init,addToTable};

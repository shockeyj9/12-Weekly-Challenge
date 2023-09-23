const inquirer = require('inquirer');
const {userChoiceArray} = require('./helper/helpers');
const {assignRequestType} = require('./helper/userinputs')


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





module.exports = {init};

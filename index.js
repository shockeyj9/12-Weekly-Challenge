const inquirer = require('inquirer');
const {userChoiceArray,welcomeBanner,assignRequestType} = require('./helper/helpers')


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
    .then( (response) => {
      assignRequestType(response.action);
      init();
      }
)};

module.exports = {init};

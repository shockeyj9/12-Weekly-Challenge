const inquirer = require('inquirer');
const {userChoiceArray,welcomeBanner} = require('./helper/helpers')

async function init (){
  await console.log(welcomeBanner());
inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: userChoiceArray,
    },
  ])
  .then((response) => {
        const {action} = response;
        const toDo = action.split(" ")[0];
        const tableName = action.split(" ")[2];      
        console.log(toDo, tableName);
    }
)};

module.exports = {init};

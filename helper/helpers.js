const Select = require('../constructor/select');
const userChoiceArray = ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"];

function welcomeBanner (){
return "Employee Manager Banner Goes HERE"
}

function assignRequestType(response){
    if (response==="view all departments"){
        // const query = new Select ('department');
        const result = selectQuery('department');
        // return result;
    }
}

async function selectQuery(){
    const url = 'api/query/department';
    const response = await fetch(url, {
        method: "GET"
      });
      console.log(response.json()); 
    }

    

module.exports = {userChoiceArray,welcomeBanner,assignRequestType}


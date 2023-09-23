const Query = require('../constructor/select');

const userChoiceArray = ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"];


function welcomeBanner (){
return "Employee Manager Banner Goes HERE"
}

async function getData(table, column, column2){
    console.log("getData called")
    let newQuery 
    if (!column2){
    newQuery = new Query (table, column);
    } else {
     newQuery = new Query (table, column, column2); 
    }
    const result = await newQuery.selectQuery();
    return result;
};




    

module.exports = {userChoiceArray,welcomeBanner,getData}


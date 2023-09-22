const {addToTable} = require('../index');
const Query = require('../constructor/select');
const userChoiceArray = ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"];

function welcomeBanner (){
return "Employee Manager Banner Goes HERE"
}

async function assignRequestType(response){
    const resType = response.split(' ')[0]
    const resColumn = response.split(' ')[1]
    let resTable = response.split(' ')
    resTable = resTable[resTable.length-1].slice(0,-1)
    // console.log(resTable,resColumn)
    if(resType=='view'){
        const newQuery = new Query (resTable,resColumn);
        const result = await newQuery.selectQuery();
    }else if (resType=='add'){
        //inquirer function to get additional information
        addToTable();
    }else if (resType=='update'){
        //inquirer function to get additional information
    }

}

    

module.exports = {userChoiceArray,welcomeBanner,assignRequestType}


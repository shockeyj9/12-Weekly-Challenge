const Query = require('../constructor/select');

const userChoiceArray = ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"];


function welcomeBanner (){
    const banner = 
   ".--------------------------------------------------------.\n"+
   "|  _____                    _                            |\n"+
   "| |  ___|                  | |                           |\n"+
   "| | |__   _ __ ___   _ __  | |  ___   _   _   ___   ___  |\n"+
   "| |  __| | '_ ` _ \ | '_ \ | | / _ \ | | | | / _ \ / _ \ |\n"+
   "| | |___ | | | | | || |_) || || (_) || |_| ||  __/|  __/ |\n"+
   "| \____/ |_| |_| |_|| .__/ |_| \___/  \__, | \___| \___| |\n"+
   "|                   | |                __/ |             |\n"+
   "|                   |_|               |___/              |\n"+
   "| ___  ___                                               |\n"+
   "| |  \/  |                                               |\n"+
   "| | .  . |  __ _  _ __    __ _   __ _   ___  _ __        |\n"+
   "| | |\/| | / _` || '_ \  / _` | / _` | / _ \| '__|       |\n"+
   "| | |  | || (_| || | | || (_| || (_| ||  __/| |          |\n"+
   "| \_|  |_/ \__,_||_| |_| \__,_| \__, | \___||_|          |\n"+
   "|                                __/ |                   |\n"+
   "|                               |___/                    |\n"+
   "`-------------------------------------------------------`"
return banner;
}

async function getData(table, column, column2){
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


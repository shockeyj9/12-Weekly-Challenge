class Query {
    constructor(table, column = null, column2 = null){
        this.table = table;
        this.column = column;
        this.column2 = column2;
        this.host = 'http://localhost:3001';
    }

    async basicQuery(){
        const url = `${this.host}/api/basic/${this.table}`
        const response = await fetch(url, {
            method: "GET"
          })
        const dataObj = await response.json()
        return dataObj.data
    }
    async deleteQuery(delTable){
        const url = `${this.host}/api/delete/${this.table}/${delTable}`
        const response = await fetch(url, {
            method: "DELETE"
          })
        const dataObj = await response.json()
        console.log('Successful DELETE request');
        return dataObj.data
    }

    async initQuery(){
        const url = `${this.host}/api/init/${this.table}`
        const response = await fetch(url, {
            method: "GET"
          })
        const dataObj = await response.json()
        return dataObj.data
    }

    async viewQuery(param){
        const url = `${this.host}/api/view/${this.table}/${param}`
        const response = await fetch(url, {
            method: "GET"
          })
        const dataObj = await response.json()
        return dataObj.data
    }
    


        //create a new entry in table
async createQuery(newEntry){
        try {
            const url = `${this.host}/api/add/${this.table}`
            const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newEntry),
                            })
                            
            const dataObj = await response.json();
            console.log('Successful POST request');
            return dataObj.data;
        } catch (error) {
            
            console.error('Error in POST request:', error);
        }
    }

    async updateQuery(newEntry){
        console.log('updateQuery called');
        try {
            let url;
            if (this.table=='role'){
                url = `${this.host}/api/update/emprole`
            }else{
                url = `${this.host}/api/update/empmanager`
            }

            const response = await fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newEntry),
                            })
                            
            const dataObj = await response.json();
            console.log('Successful PUT request');
            return dataObj.data;
        } catch (error) {
            
            console.error('Error in PUT request:', error);
        }
    }

};

module.exports = Query;
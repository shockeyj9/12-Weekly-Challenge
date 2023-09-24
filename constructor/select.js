class Query {
    constructor(table, column = null, column2 = null){
        this.table = table;
        this.column = column;
        this.column2 = column2;
        this.host = 'http://localhost:3001';
    }

    async selectQuery(){
        let url;
        if (this.column == null){
             url = `${this.host}/api/query/${this.table}`
        }else if (this.column2==null){
             url = `${this.host}/api/query/${this.column}/${this.table}`
        }else {
            url = `${this.host}/api/query/${this.column}/${this.column2}/${this.table}`
        }
        const response = await fetch(url, {
            method: "GET"
          })
        const dataObj = await response.json()
        return dataObj.data
    }
    

        //create a new entry in table
async createQuery(newEntry){
        try {
            const url = `${this.host}/api/query/${this.table}`
            const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newEntry),
                            })
                            
            const dataObj = await response.json();
            console.log('Successful POST request:', dataObj);
            return dataObj.data;
        } catch (error) {
            
            console.error('Error in POST request:', error);
        }
    }

    async updateQuery(newEntry){
        console.log('updateQuery called');
        try {
            const url = `${this.host}/api/query/employee`
            const response = await fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newEntry),
                            })
                            
            const dataObj = await response.json();
            console.log('Successful Update request:', dataObj);
            return dataObj.data;
        } catch (error) {
            
            console.error('Error in POST request:', error);
        }
    }

};

module.exports = Query;
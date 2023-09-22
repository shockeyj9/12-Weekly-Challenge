class Query {
    constructor(table, column){
        this.table = table;
        this.column = column;
        this.host = 'http://localhost:3001';
    }
    selectQuery(){
        const url = `${this.host}/api/query/${this.table}`
        fetch(url, {
            method: "GET"
          })
          .then((response)=> response.json())
          .then ((data)=>console.table(data.data))

        }

        //create a new entry in table
        createQuery(newEntry){
            const url = `${this.host}/api/query/${this.table}`
            fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log('Successful POST request:', data);
                  return data;
                })
                .catch((error) => {
                  console.error('Error in POST request:', error);
                })
            }
};

module.exports = Query;
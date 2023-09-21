const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index');
const {init} = require('./index');
const {welcomeBanner} = require('./helper/helpers')

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

//ROUTE FOR API/DATA
app.use('/api',api);

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
    console.log(welcomeBanner());
    init();
  });


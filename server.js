const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const api = require('./routes/index');
const init = require('./index');
require('dotenv').config();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  );





  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    init.init();
  });
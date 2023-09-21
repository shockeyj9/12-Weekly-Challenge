const express = require('express');
const app = express(); 

//ROUTING FILES 
const queryRouter = require('./api/queries');
app.use('/query',queryRouter);

module.exports = app;
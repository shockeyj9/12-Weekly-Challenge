const express = require('express');
const app = express();

const basicRoutes = require('./basic.js');
const initRoutes = require('./init.js');
const viewRoutes = require('./view.js');
const addRoutes = require('./add.js');
const updateRoutes = require('./update.js');
const deleteRoutes = require('./delete.js');

app.use('/basic', basicRoutes);
app.use('/init', initRoutes);
app.use('/view', viewRoutes);
app.use('/add', addRoutes);
app.use('/update', updateRoutes);
app.use('/delete', deleteRoutes);

module.exports = app;
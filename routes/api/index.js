// const router = require('express').Router();
const express = require('express');
const app = express();

const queryRoutes = require('./queries.js');

app.use('/query', queryRoutes);

module.exports = app;
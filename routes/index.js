const express = require('express');
const app = express();

//Importing & setting routes (/api)
const cardRoutes = require('./card');
app.use('/card', cardRoutes);

module.exports = app;

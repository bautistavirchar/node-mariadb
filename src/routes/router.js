const express = require('express');
const app = express();

const users = require('./users');
const query = require('./query');

app.use('/users', users);
app.use('/query',query);

module.exports = app;

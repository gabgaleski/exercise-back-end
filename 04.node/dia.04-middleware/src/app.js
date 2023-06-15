const express = require('express');
const route = require('./routes/home')

const app = express();

app.use(express.json());

app.use('/', route);

module.exports = app;
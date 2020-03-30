const express = require('express');
const mongo = require('mongoose');
const routes = require('./routes');

const app = express();

mongo.connect('mongodb://192.168.15.10:27017/omnistack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes);

module.exports = app;

const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongo.connect(
  'mongodb+srv://felipealves:QAOWtwbjG2LrjeTM@felipealves-kyiba.gcp.mongodb.net/omnistack?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());

app.use(routes);

module.exports = server;

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

/* server split for http and websocket request */
const server = require("http").Server(app);
const io = require("socket.io")(server);

/* DB communication */
mongoose.connect("mongodb://localhost:27017/instaRocket", {
  useNewUrlParser: true
});

/* allow all Controller to use websocket */
app.use((req, res, next) => {
  req.io = io;
  next();
});

/* allow other applications to access the application */
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

server.listen(3333);

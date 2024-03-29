import express from 'express';
import mongo from 'mongoose';
import cors from 'cors';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.io = socketIO(this.server);

    this.connectedUsers = {};

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;

      this.connectedUsers[user_id] = socket.id;
    });

    this.mongo();
    this.middlewares();
    this.routes();
  }

  mongo() {
    this.mongoConnection = mongo.connect(
      'mongodb://192.168.15.10:27017/omnistack',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }

  middlewares() {
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      return next();
    });

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;

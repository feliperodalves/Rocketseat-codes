import express from 'express';
import mongo from 'mongoose';
import cors from 'cors';
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
      const { user } = socket.handshake.query;

      this.connectedUsers[user] = socket.id;
    });

    this.mongo();
    this.middlewares();
    this.routes();
  }

  mongo() {
    this.mongoConnection = mongo.connect(
      'mongodb://localhost:27017/omnistack',
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
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;

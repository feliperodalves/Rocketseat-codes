import express from 'express';
import mongo from 'mongoose';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

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
      }
    );
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

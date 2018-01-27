import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import * as config from './config';

// App class will encapsulate our web server.
export class App {
  public express: express.Application;
  public mongoose;

  constructor () {}

  init(port: string | number) {
    this.express = express();
    // Allow parsing JSON data obtained from post
    this.express.use(bodyParser.json());
  
    this.initDatabase(() => {
      this.mountRoutes();
  
      this.express.listen(port);
      console.log(`Server is now listening on port ${port}...`);
    });
  }

  //mounts the routes served by the server.
  private mountRoutes (): void {
    this.express.use('/auth', require('./auth/routes'));
  }

  private initDatabase(callback: any): void {
    mongoose.connect(config.DB_URI);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Unable to connect to MongoDB server'));
    db.once('open', function() {
      // we're connected!
      console.log('Connected to MongoDB server');
      this.mongoose = mongoose;
      callback();
    });
  }
}

// The express instance is reachable through the public express property.
export default new App();
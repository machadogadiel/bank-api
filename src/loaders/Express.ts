import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "../service/Logger";

import RoutesMiddleware from "../middleware/Routes";
import ErrorMiddleware from "../middleware/Error";

export default class ExpressLoader {
  app: express.Express;

  constructor() {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    this.app = app

    // app preferences
    app.disable("x-powered-by");
    
    // middleware declaration
    app.use(ErrorMiddleware.handler);
    app.use(RoutesMiddleware.handler);
    app.use(morgan("dev"));
    app.use(express.json());

    // listen to configured port
    app.listen(port, () => {
      logger.info(`[Server]: Server is running at http://localhost:${port}`);
    });
  }

  get ExpressInstance() {
    return this.app
  }
}

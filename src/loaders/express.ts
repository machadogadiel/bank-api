import express, { Express, NextFunction, Request, Response } from "express";
import http from "http";
import morgan from "morgan";
import dotenv from "dotenv";
import logger from "../service/logger";

export default class ExpressLoader {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

  constructor() {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    // middleware declaration
    app.use(morgan("dev"))
    app.use(ExpressLoader.errorHandler);

    // listen to configured port
    this.server = app.listen(port, () => {
      logger.info(`[Server]: Server is running at http://localhost:${port}`);
    });
  }

  get Server() {
    return this.server;
  }

  // default error handler
  static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      error,
    });
  }
}

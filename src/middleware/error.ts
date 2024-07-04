import { NextFunction, Request, Response } from "express";
import logger from "../service/logger";

export default class ErrorMiddleware {
  static handler(
    error: Error,
    _: Request,
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

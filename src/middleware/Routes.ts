import { NextFunction, Request, Response } from "express";

export default class RoutesMiddleware {
  static handler(_: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type"
    );
    res.setHeader("ngrok-skip-browser-warning", "1")
    res.setHeader('Content-Type', 'application/json');
    next();
  }
}

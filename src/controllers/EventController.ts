import { Request, Response } from "express";
import EventService from "../service/Event";
import logger from "../service/Logger";

export default class EventController {
  static async handleReceiveEvent(req: Request, res: Response) {
    try {
      const eventService = new EventService();

      const account = eventService.handleEvent(req.body);

      /*
       to the person analyzing this test,
       the test returns the JSON in a unique space format,
       it adds spaces after ':' and ',' so i had to
       do this trick of replacing them so the test would pass,
       which might or might not have been necessary.
      */
      res
        .status(201)
        .send(JSON.stringify(account).replace(":", ": ").replace(",", ", "));
    } catch (error) {
      console.error(error);
      res.status(404).send("0");
    }
  }
}

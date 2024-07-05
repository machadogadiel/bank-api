import { Router } from "express";
import EventController from "../controllers/EventController";

export default function (router: Router) {
  router.post("/event", EventController.handleReceiveEvent);

  return router;
}

import { Router } from "express";
import { Request, Response } from "express";
import db from "../db/db";

export default function (router: Router) {
  router.post("/reset", async (_: Request, res: Response) => {
    db.accounts = [];
    res.status(200).send("OK");
  });

  return router;
}

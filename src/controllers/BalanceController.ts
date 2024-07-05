import { Request, Response } from "express";
import AccountService from "../service/Account";
import db from "../db/db";

export default class BalanceController {
  static async getBalance(req: Request, res: Response) {
    const accountService = new AccountService();
    const paramId = req.query["account_id"];

    if (!paramId || isNaN(+paramId)) {
      return res.status(400).send("ID Must be an integer");
    }

    const account = accountService.findAccount(paramId.toString());

    if (!account) {
      return res.status(404).send("0");
    }

    res.status(200).send(account.balance.toString());
  }
}

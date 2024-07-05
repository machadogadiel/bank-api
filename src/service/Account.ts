import db from "../db/db";
import logger from "./Logger";

export default class AccountService {
  findAccount(accountId: string) {
    const account = db.accounts.find((account) => account.id === accountId);

    return account;
  }

  createAccount(id: string, balance?: number) {
    if (!id) {
      throw new Error("Can't create account without ID");
    }

    const account = { id, balance: balance || 0 };

    db.accounts.push(account);

    return account;
  }
}

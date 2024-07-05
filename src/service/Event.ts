import { IEvent } from "../models/Event";
import AccountService from "./Account";

export default class EventService {
  handleEvent(event: IEvent) {
    if (!event) {
      throw new Error("No event received");
    }

    let account;

    if (event.type === "withdraw" && event.origin) {
      account = { origin: this.withdraw(event.origin, event.amount) };
    }

    if (event.type === "deposit") {
      account = { destination: this.deposit(event.destination, event.amount) };
    }

    if (event.type === "transfer" && event.origin && event.destination) {
      const [origin, destination] = this.transfer(
        event.destination,
        event.origin,
        event.amount
      );

      account = {
        origin,
        destination,
      };
    }

    return account;
  }

  withdraw(originAccountId: string, amount = 0) {
    const account = new AccountService().findAccount(originAccountId);

    if (!account) return;

    account.balance -= amount;

    return account;
  }

  deposit(destinationAccountId: string, amount = 0) {
    const accountService = new AccountService();

    let account = accountService.findAccount(destinationAccountId);

    if (!account) {
      account = accountService.createAccount(destinationAccountId, amount);
    } else {
      account.balance += amount;
    }

    return account;
  }

  transfer(destinationAccountId: string, originAccountId: string, amount = 0) {
    if (!destinationAccountId || !originAccountId) {
      throw new Error("Transfer must have an origin and destination");
    }

    const origin = this.withdraw(originAccountId, amount);
    const destination = this.deposit(destinationAccountId, amount);

    return [origin, destination];
  }
}

export interface IEvent {
  type?: "withdraw" | "deposit" | "transfer";
  destination: string;
  origin?: string;
  amount: number;
}
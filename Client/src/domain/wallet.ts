import type {ICreditCard} from "./creditCard.ts";

export interface IWallet {
    id: number,
    name: string,
    balance: number,
    transactionsIds?: number[],
    creditCards?: ICreditCard[]
}
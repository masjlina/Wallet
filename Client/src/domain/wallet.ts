import type {ICreditCard} from "./account.ts";

export interface IWallet {
    id: number,
    name: string,
    balance: number,
    transactionsIds?: number[],
    creditCards?: ICreditCard[]
}

export type IWalletToUpdate = Partial<Pick<IWallet, "name" | "balance">>;
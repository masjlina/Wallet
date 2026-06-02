export interface ICreditCard {
    id: number,
    walletId: number,
    name: string,
    balance: number,
    transactionsIds: number[]
}

export type ICreditCardToUpdate = Partial<Pick<ICreditCard, "name" | "balance">>;
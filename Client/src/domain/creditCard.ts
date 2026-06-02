export interface ICreditCard {
    id: number,
    walletId: number,
    name: string,
    balance: number,
    transactionsIds: number[]
}
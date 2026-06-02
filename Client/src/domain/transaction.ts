export interface ITransaction {
    id: number,
    walletId?: number,
    creditCardId?: number,
    categoryId?: number,

    name: string,
    description?: string,
    amount: number,
    // TODO: add category
    category?: null,
    createdAt: Date,
    updatedAt: Date
}
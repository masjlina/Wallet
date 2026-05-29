export interface ITransaction {
    id: number,
    walletId?: number,
    creditCardId?: number,
    categoryId?: number,

    name: string,
    description?: string,
    amount: number,
    createdAt: Date,
    updatedAt: Date
}

export type ITransactionUpsert = Pick<ITransaction, "name" | "amount"> &
    Partial<Pick<ITransaction, "walletId" | "creditCardId" | "categoryId" | "description" | "createdAt" | "updatedAt">>;

export function createTransactionFromDto(transactionDto: ITransaction): ITransaction {
    return {
        id: transactionDto.id,
        walletId: transactionDto.walletId,
        creditCardId: transactionDto.creditCardId,
        categoryId: transactionDto.categoryId,
        name: transactionDto.name,
        description: transactionDto.description,
        amount: transactionDto.amount,
        createdAt: transactionDto.createdAt,
        updatedAt: transactionDto.updatedAt
    };
}

export function createTransactionFromObject({
                                                walletId,
                                                creditCardId,
                                                categoryId,
                                                name,
                                                description,
                                                amount,
                                                createdAt,
                                                updatedAt
                                            }: ITransactionUpsert): ITransactionUpsert {
    return {
        walletId,
        creditCardId,
        categoryId,
        name,
        description,
        amount,
        createdAt,
        updatedAt
    };
}

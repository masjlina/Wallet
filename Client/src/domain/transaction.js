export default function createTransactionFromDto(transactionDto) {
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
    }
}

export function createTransactionFromObject({
                                                walletId = null,
                                                creditCardId = null,
                                                categoryId = null,
                                                name,
                                                description,
                                                amount,
                                                createdAt,
                                                updatedAt
                                            }) {
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
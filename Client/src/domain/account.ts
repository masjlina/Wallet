export interface ICreditCard {
    id: number,
    walletId: number,
    name: string,
    balance: number,
    transactionsIds: number[]
}

interface ICreditCardDto extends Omit<ICreditCard, "transactionsIds"> {
    transactionIds?: number[];
    transactionsIds?: number[];
}

export type IAccountUpdate = Partial<Pick<ICreditCard, "name" | "balance">>;

export function mapAccount(accountDto: ICreditCardDto): ICreditCard {
    return {
        id: accountDto.id,
        walletId: accountDto.walletId,
        name: accountDto.name,
        balance: accountDto.balance,
        transactionsIds: accountDto.transactionIds ?? accountDto.transactionsIds ?? []
    };
}

export function createAccountToUpdate({name, balance}: IAccountUpdate): IAccountUpdate {
    return {
        name: name,
        balance: balance
    };
}

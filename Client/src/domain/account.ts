export interface ICreditCard {
    id: number,
    walletId: number,
    name: string,
    balance: number,
    transactionsIds: number[]
}

export default function mapAccount(accountDto) {
    return {
        id: accountDto.id,
        walletId: accountDto.walletId,
        name: accountDto.name,
        balance: accountDto.balance,
        transactionsIds: accountDto.transactionIds
    }
}

export function createAccountToUpdate({name, balance}) {
    return {
        name: name,
        balance: balance
    }
}
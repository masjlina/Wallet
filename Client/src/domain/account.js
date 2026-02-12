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
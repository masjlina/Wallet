export default function mapWallet(walletDto) {
    return {
        id: walletDto.id,
        name: walletDto.name,
        balance: walletDto.cash,
        transactionsIds: walletDto.transactionIds,
        creditCards: walletDto.creditCardDtos
    }
}

export function createWalletToUpdate(wallet) {
    return {
        name: wallet.name,
        balance: wallet.balance
    }
}
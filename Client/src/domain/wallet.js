export default function mapWallet(walletDto) {
    return {
        id: walletDto.id,
        name: walletDto.name,
        cash: walletDto.cash,
        transactionsIds: walletDto.transactionIds,
        creditCards: walletDto.creditCardDtos
    }
}
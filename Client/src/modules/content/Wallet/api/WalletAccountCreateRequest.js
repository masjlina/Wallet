export default function createWalletAccountRequest(walletId, cardName, balance) {
    return {
        name: cardName,
        balance: balance,
        walletId: walletId
    }
}
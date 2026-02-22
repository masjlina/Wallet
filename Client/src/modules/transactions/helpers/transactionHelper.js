export const getTodayTransactions = (transactions) => {
    const today = new Date().toDateString();

    if (!transactions)
        return []

    return transactions
        .filter(t => new Date(t.createdAt).toDateString() === today);
}

export default getTodayTransactions;
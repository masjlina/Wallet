import {getDayAgo} from "@/shared/services/dateTimeService";

export const getTodayTransactions = (transactions) => {
    if (!transactions)
        return []

    const today = new Date().toDateString();

    return transactions
        .filter(t => new Date(t.createdAt).toDateString() === today);
}

export const getThisMonthTransactions = (transactions) => {
    if (!transactions)
        return []

    const now = new Date();

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0, 0, 0, 0
    );

    const startOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1,
        0, 0, 0, 0
    );

    return transactions.filter(t => {
        const date = new Date(t.createdAt);

        return (
            date >= startOfMonth &&
            date < startOfNextMonth
        );
    });
};

export const getWeekTransactions = (transactions) => {
    if (!transactions)
        return []

    const now = new Date();
    const weekAgo = getDayAgo(7);

    return transactions.filter(t => {
        const date = new Date(t.createdAt);

        return (
            date >= weekAgo &&
            date <= now
        );
    });
};

export default getTodayTransactions;
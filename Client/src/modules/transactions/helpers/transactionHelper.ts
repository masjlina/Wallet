import {getDayAgo} from "@/shared/services/dateTimeService";
import type {ITransaction} from "@/domain/transaction.ts";

export const getTodayTransactions = (transactions: ITransaction[]): ITransaction[] => {
    if (!transactions)
        return []

    const today = new Date().toDateString();

    return transactions
        .filter(t => new Date(t.createdAt).toDateString() === today);
}

export const getDayTransactions = (transactions: ITransaction[], day: string): ITransaction[] => {
    if (!transactions)
        return []

    return transactions
        .filter(t => new Date(t.createdAt).toDateString() === day);
}

export const getThisMonthTransactions = (transactions: ITransaction[]): ITransaction[] => {
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

export const getWeekTransactions = (transactions: ITransaction[]): ITransaction[] => {
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
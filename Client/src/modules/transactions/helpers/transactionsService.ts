import type {TransactionFilterType} from "@/shared/consts/transactionTypes";
import {TRANSACTION_FILTER_TYPE} from "@/shared/consts/transactionTypes";
import {ACCOUNT_TYPE, type AccountType} from "@/shared/consts/accountType";
import type {ITransaction} from "@/domain/transaction.ts";

interface IAccount {
    id: number,
    type: AccountType
}

export const filterTransactionsByType = (type: TransactionFilterType, transactions: ITransaction[]) => {
    switch (type) {
        case TRANSACTION_FILTER_TYPE.INCOME:
            return transactions.filter(t => t.amount >= 0);

        case TRANSACTION_FILTER_TYPE.EXPENSE:
            return transactions.filter(t => t.amount < 0);

        default:
            return transactions;
    }
}

export const filterTransactionByAccount = (account: IAccount, transactions: ITransaction[]) => {
    if (!transactions) return [];

    switch (account.type) {
        case ACCOUNT_TYPE.CARD:
            return transactions.filter(t => t.creditCardId === account.id);
        case ACCOUNT_TYPE.CASH:
            return transactions.filter(t => t.walletId === account.id);
    }
}
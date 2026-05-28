const TRANSACTION_TYPE = {
    EXPENSE: "expense",
    INCOME: "income"
} as const;

export type TRANSACTION_TYPE = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];

const TRANSACTION_FILTER_TYPE = Object.freeze({
    ALL: "All",
    EXPENSE: "Expense",
    INCOME: "Income"
});

export type TRANSACTION_FILTER_TYPE = typeof TRANSACTION_FILTER_TYPE[keyof typeof TRANSACTION_FILTER_TYPE];

export const TRANSACTION_COLUMNS = Object.freeze({
    NAME: "Name",
    AMOUNT: "Amount",
    CATEGORY: "Category",
    PAYMENT_METHOD: "Payment Method",
    DATE: "Date",
    ACTION: "Action",
});

export type TRANSACTION_COLUMNS = typeof TRANSACTION_COLUMNS[keyof typeof TRANSACTION_COLUMNS];
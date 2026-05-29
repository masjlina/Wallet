export const TRANSACTION_TYPE = {
    EXPENSE: "expense",
    INCOME: "income"
} as const;

export const TRANSACTION_FILTER_TYPE = {
    ALL: "All",
    EXPENSE: "Expense",
    INCOME: "Income"
} as const;

export type TRANSACTION_FILTER_TYPE = typeof TRANSACTION_FILTER_TYPE[keyof typeof TRANSACTION_FILTER_TYPE];

export const TRANSACTION_COLUMNS = {
    NAME: "Name",
    AMOUNT: "Amount",
    CATEGORY: "Category",
    PAYMENT_METHOD: "Payment Method",
    DATE: "Date",
    ACTION: "Action",
} as const;

export default TRANSACTION_TYPE;

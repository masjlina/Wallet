const TRANSACTION_TYPE = Object.freeze({
    EXPENSE: "expense",
    INCOME: "income"
});

export const TRANSACTION_COLUMNS = Object.freeze({
    NAME: "Name",
    AMOUNT: "Amount",
    CATEGORY: "Category",
    PAYMENT_METHOD: "Payment Method",
    DATE: "Date",
    ACTION: "Action",
});

export default TRANSACTION_TYPE;
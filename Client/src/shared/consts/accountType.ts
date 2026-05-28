const AccountType = {
    CASH: "cash",
    CARD: "card"
} as const;

export type ACCOUNT_TYPE = typeof AccountType[keyof typeof AccountType];
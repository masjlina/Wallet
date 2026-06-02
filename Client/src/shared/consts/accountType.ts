export const ACCOUNT_TYPE = {
    CASH: "cash",
    CARD: "card"
} as const;

export type AccountType = typeof ACCOUNT_TYPE[keyof typeof ACCOUNT_TYPE];

import ACCOUNT_TYPE from "@/shared/consts/accountType";

export const checkAccountType = (account) => {
    if (!account)
        return null;

    if (account.walletId)
        return ACCOUNT_TYPE.CASH;
    else
        return ACCOUNT_TYPE.CARD;
}
import {ACCOUNT_TYPE} from "@/shared/consts/accountType";
import type {ICreditCard} from "@/domain/creditCard.ts";
import type {IWallet} from "@/domain/wallet.ts";

export const checkAccountType = (account: ICreditCard | IWallet | undefined) => {
    if (!account)
        return null;

    if ("walletId" in account)
        return ACCOUNT_TYPE.CASH;
    else
        return ACCOUNT_TYPE.CARD;
}
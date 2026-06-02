// App (modules)
import {type IWallet} from "@/domain/wallet.ts";
import type {ICreateWalletRequest} from "@/modules/wallet-accounts/api/types/createWalletRequest.ts";
import type {IUpdateWalletRequest} from "@/modules/wallet-accounts/api/types/updateWalletRequest.ts";

// Shared
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {AppError} from "@/shared/utils/AppError.ts";

type ReturnType<T extends IWallet> = Promise<T | AppError>;

export async function getWallet(): ReturnType<IWallet> {
    try {
        const result = await request<IWallet>({
            url: ENDPOINTS.WALLET,
            method: "GET"
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function createWallet(data: ICreateWalletRequest): ReturnType<IWallet> {
    try {
        const result = await request<IWallet>({
            url: ENDPOINTS.WALLET,
            method: "POST",
            body: data
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function updateWallet(walletId: number, wallet: IUpdateWalletRequest): ReturnType<IWallet> {
    try {
        const result = await request<IWallet>({
            url: `${ENDPOINTS.WALLET}/${walletId}`,
            method: "PATCH",
            body: wallet
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

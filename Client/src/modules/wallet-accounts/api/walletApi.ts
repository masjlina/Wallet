// App (modules)
import {mapWallet, type IWallet} from "@/domain/wallet.ts";
import type {ICreateWalletRequest} from "@/modules/wallet-accounts/api/types/createWalletRequest.ts";
import type {IUpdateWalletRequest} from "@/modules/wallet-accounts/api/types/updateWalletRequest.ts";
import type {IWalletResponse} from "@/modules/wallet-accounts/api/types/walletResponse.ts";

// Shared
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {AppError} from "@/shared/utils/AppError.ts";

type ReturnType<T extends IWalletResponse> = Promise<T | AppError>;

export async function getWallet(): ReturnType<IWalletResponse> {
    try {
        const result = await request<IWallet>({
            url: ENDPOINTS.WALLET,
            method: "GET"
        });

        return {
            wallet: mapWallet(result)
        };
    } catch (error) {
        return AppError.from(error);
    }
}

export async function createWallet(walletName: string): ReturnType<IWalletResponse> {
    try {
        const walletRequest: ICreateWalletRequest = {
            name: walletName
        };

        const result = await request<IWallet>({
            url: ENDPOINTS.WALLET,
            method: "POST",
            body: walletRequest
        });

        return {
            wallet: mapWallet(result)
        };
    } catch (error) {
        return AppError.from(error);
    }
}

export async function updateWallet(walletId: number, wallet: IUpdateWalletRequest): ReturnType<IWalletResponse> {
    try {
        const result = await request<IWallet>({
            url: `${ENDPOINTS.WALLET}/${walletId}`,
            method: "PATCH",
            body: wallet
        });

        return {
            wallet: mapWallet(result)
        };
    } catch (error) {
        return AppError.from(error);
    }
}

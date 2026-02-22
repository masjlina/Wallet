// App (modules)
import mapWallet from "@/domain/wallet";
import createWalletRequest from "@/modules/wallet-accounts/api/dto/WalletCreateRequest";

// Shared
import createErrorResponseDto from "@/shared/api/ErrorResponseDto";
import endpoints from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";

export async function getWallet() {
    try {
        const result = await request(`${endpoints.wallet}`);

        return {
            wallet: mapWallet(result)
        };
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function createWallet(walletName) {
    try {
        const walletRequest = createWalletRequest(walletName);

        const result = await request(endpoints.wallet, "POST", walletRequest);

        return {
            wallet: mapWallet(result)
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function updateWallet(walletId, wallet) {
    try {
        const result = await request(`${endpoints.wallet}/${walletId}`, "PATCH", wallet);

        return {
            wallet: mapWallet(result)
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
import {request} from "../../../../utils/httpClient";
import endpoints from "../../../../endpoints";
import createErrorResponseDto from "../../../../api/ErrorResponseDto";
import createWalletRequest from "./WalletCreateRequest";
import mapWallet from "../../../../domain/wallet";

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
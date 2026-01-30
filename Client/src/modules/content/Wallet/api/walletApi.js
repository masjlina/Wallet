import {request} from "../../../../utils/httpClient";
import endpoints from "../../../../endpoints";
import createErrorResponseDto from "../../../../api/ErrorResponseDto";
import createWalletRequest from "./WalletCreateRequestDto";

export async function getWallet() {
    try {
        const result = await request(`${endpoints.wallet}`);

        return {
            wallet: result
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
            wallet: result
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
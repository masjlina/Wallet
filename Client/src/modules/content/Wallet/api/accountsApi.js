import {request} from "../../../../utils/httpClient";
import endpoints from "../../../../endpoints";
import createErrorResponseDto from "../../../../api/ErrorResponseDto";
import mapAccount from "../../../../domain/account";

export async function getAllAccounts() {
    try {
        const result = await request(`${endpoints.creditCards}`);

        return {
            accounts: result.map(cc => mapAccount(cc))
        };
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function createAccount(account) {
    try {
        const result = await request(endpoints.creditCards, "POST", account);

        return {
            account: result
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function removeAccount(accountId) {
    try {
        const result = await request(`${endpoints.creditCards}/${accountId}`, "DELETE");

        return {
            accountToDeleteId: accountId
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
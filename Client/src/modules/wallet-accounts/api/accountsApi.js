// App (modules)
import mapAccount from "@/domain/account";

// Shared
import createErrorResponseDto from "@/shared/api/errorResponse";
import ENDPOINTS from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";

export async function getAllAccounts() {
    try {
        const result = await request(`${ENDPOINTS.CREDIT_CARDS}`);

        return {
            accounts: result.map(cc => mapAccount(cc))
        };
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function getAccount(accountId) {
    try {
        const result = await request(`${ENDPOINTS.CREDIT_CARDS}/${accountId}`);

        return {
            account: result
        };
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function createAccount(account) {
    try {
        const result = await request(ENDPOINTS.CREDIT_CARDS, "POST", account);

        return {
            account: mapAccount(result)
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function updateAccount(accountId, account) {
    try {
        const result = await request(`${ENDPOINTS.CREDIT_CARDS}/${accountId}`, "PATCH", account);

        return {
            account: mapAccount(result)
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function removeAccount(accountId) {
    try {
        await request(`${ENDPOINTS.CREDIT_CARDS}/${accountId}`, "DELETE");

        return {
            accountToDeleteId: accountId
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
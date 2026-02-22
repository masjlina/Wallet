// App (modules)
import mapAccount from "@/domain/account";

// Shared
import createErrorResponseDto from "@/shared/api/ErrorResponseDto";
import endpoints from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";

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

export async function getAccount(accountId) {
    try {
        const result = await request(`${endpoints.creditCards}/${accountId}`);

        return {
            account: result
        };
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function createAccount(account) {
    try {
        const result = await request(endpoints.creditCards, "POST", account);

        return {
            account: mapAccount(result)
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function updateAccount(accountId, account) {
    try {
        const result = await request(`${endpoints.creditCards}/${accountId}`, "PATCH", account);

        return {
            account: mapAccount(result)
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function removeAccount(accountId) {
    try {
        await request(`${endpoints.creditCards}/${accountId}`, "DELETE");

        return {
            accountToDeleteId: accountId
        }
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
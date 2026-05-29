// App (modules)
import {mapAccount, type ICreditCard} from "@/domain/account.ts";
import type {IAccountResponse} from "@/modules/wallet-accounts/api/types/accountResponse.ts";
import type {IAccountsResponse} from "@/modules/wallet-accounts/api/types/accountsResponse.ts";
import type {ICreateAccountRequest} from "@/modules/wallet-accounts/api/types/createAccountRequest.ts";
import type {IRemoveAccountResponse} from "@/modules/wallet-accounts/api/types/removeAccountResponse.ts";
import type {IUpdateAccountRequest} from "@/modules/wallet-accounts/api/types/updateAccountRequest.ts";

// Shared
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {AppError} from "@/shared/utils/AppError.ts";

type ReturnType<T extends IAccountsResponse | IAccountResponse | IRemoveAccountResponse> = Promise<T | AppError>;

export async function getAllAccounts(): ReturnType<IAccountsResponse> {
    try {
        const result = await request<ICreditCard[]>({
            url: ENDPOINTS.CREDIT_CARDS,
            method: "GET"
        });

        return {
            accounts: result.map(account => mapAccount(account))
        };
    } catch (error) {
        return AppError.from(error);
    }
}

export async function getAccount(accountId: number): ReturnType<IAccountResponse> {
    try {
        const result = await request<ICreditCard>({
            url: `${ENDPOINTS.CREDIT_CARDS}/${accountId}`,
            method: "GET"
        });

        return {
            account: mapAccount(result)
        };
    } catch (error) {
        return AppError.from(error);
    }
}

export async function createAccount(account: ICreateAccountRequest): ReturnType<IAccountResponse> {
    try {
        const result = await request<ICreditCard>({
            url: ENDPOINTS.CREDIT_CARDS,
            method: "POST",
            body: account
        });

        return {
            account: mapAccount(result)
        };
    } catch (error) {
        return AppError.from(error);
    }
}

export async function updateAccount(accountId: number, account: IUpdateAccountRequest): ReturnType<IAccountResponse> {
    try {
        const result = await request<ICreditCard>({
            url: `${ENDPOINTS.CREDIT_CARDS}/${accountId}`,
            method: "PATCH",
            body: account
        });

        return {
            account: mapAccount(result)
        };
    } catch (error) {
        return AppError.from(error);
    }
}

export async function removeAccount(accountId: number): ReturnType<IRemoveAccountResponse> {
    try {
        await request({
            url: `${ENDPOINTS.CREDIT_CARDS}/${accountId}`,
            method: "DELETE"
        });

        return {
            accountToDeleteId: accountId
        };
    } catch (error) {
        return AppError.from(error);
    }
}

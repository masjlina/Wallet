// App (modules)
import {createTransactionFromDto, type ITransaction} from "@/domain/transaction.ts";
import type {IRemoveTransactionResponse} from "@/modules/transactions/api/types/removeTransactionResponse.ts";
import type {IUpsertTransactionRequest} from "@/modules/transactions/api/types/upsertTransactionRequest.ts";

// Shared
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {AppError} from "@/shared/utils/AppError.ts";

type ReturnType<T extends ITransaction | ITransaction[] | IRemoveTransactionResponse> = Promise<T | AppError>;

export async function getAllTransactions(): ReturnType<ITransaction[]> {
    try {
        const result = await request<ITransaction[]>({
            url: ENDPOINTS.TRANSACTIONS,
            method: "GET"
        });

        return result.map(transaction => createTransactionFromDto(transaction));
    } catch (error) {
        return AppError.from(error);
    }
}

export async function getTransaction(transactionId: number): ReturnType<ITransaction> {
    try {
        const result = await request<ITransaction>({
            url: `${ENDPOINTS.TRANSACTIONS}/${transactionId}`,
            method: "GET"
        });

        return createTransactionFromDto(result);
    } catch (error) {
        return AppError.from(error);
    }
}

export async function createTransaction(transaction: IUpsertTransactionRequest): ReturnType<ITransaction> {
    try {
        const result = await request<ITransaction>({
            url: ENDPOINTS.TRANSACTIONS,
            method: "POST",
            body: transaction
        });

        return createTransactionFromDto(result);
    } catch (error) {
        return AppError.from(error);
    }
}

export async function updateTransaction(
    transactionId: number,
    transaction: IUpsertTransactionRequest
): ReturnType<ITransaction> {
    try {
        const result = await request<ITransaction>({
            url: `${ENDPOINTS.TRANSACTIONS}/${transactionId}`,
            method: "PATCH",
            body: transaction
        });

        return createTransactionFromDto(result);
    } catch (error) {
        return AppError.from(error);
    }
}

export async function removeTransaction(transactionId: number): ReturnType<IRemoveTransactionResponse> {
    try {
        await request({
            url: `${ENDPOINTS.TRANSACTIONS}/${transactionId}`,
            method: "DELETE"
        });

        return {
            transactionToDeleteId: transactionId
        };
    } catch (error) {
        return AppError.from(error);
    }
}

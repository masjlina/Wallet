// App (modules)
import createTransactionFromDto from "@/domain/transaction";

// Shared
import createErrorResponseDto from "@/shared/api/ErrorResponseDto";
import endpoints from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";

export async function getAllTransactions() {
    try {
        const result = await request(`${endpoints.transactions}`);
        return result.map(t => createTransactionFromDto(t))
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function getTransaction(transactionId) {
    try {
        const result = await request(`${endpoints.transactions}/${transactionId}`);
        return createTransactionFromDto(result)
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function createTransaction(transaction) {
    try {
        const result = await request(endpoints.transactions, "POST", transaction);
        return createTransactionFromDto(result)
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function updateTransaction(transactionId, transaction) {
    try {
        const result = await request(`${endpoints.transactions}/${transactionId}`, "PATCH", transaction);
        return createTransactionFromDto(result)
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function removeTransaction(transactionId) {
    try {
        await request(`${endpoints.transactions}/${transactionId}`, "DELETE");
        return transactionId
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
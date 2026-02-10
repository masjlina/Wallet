import {request} from "../../../../utils/httpClient";
import endpoints from "../../../../endpoints";
import createErrorResponseDto from "../../../../api/ErrorResponseDto";
import createTransactionFromDto from "../../../../domain/transaction";

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

export async function removeTransaction(transactionId) {
    try {
        const result = await request(`${endpoints.transactions}/${transactionId}`, "DELETE");
        return transactionId
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
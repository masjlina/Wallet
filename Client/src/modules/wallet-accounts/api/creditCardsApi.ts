// App (modules)
import {type ICreditCard} from "@/domain/creditCard.ts";
import type {ICreateCreditCardRequest} from "@/modules/wallet-accounts/api/types/createCreditCardRequest.ts";
import type {IRemoveCreditCardResponse} from "@/modules/wallet-accounts/api/types/removeCreditCardResponse.ts";
import type {IUpdateCreditCardRequest} from "@/modules/wallet-accounts/api/types/updateCreditCardRequest.ts";

// Shared
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {AppError} from "@/shared/utils/AppError.ts";

type ReturnType<T extends ICreditCard | ICreditCard[] | IRemoveCreditCardResponse> = Promise<T | AppError>;

export async function getAllCreditCards(): ReturnType<ICreditCard[]> {
    try {
        const result = await request<ICreditCard[]>({
            url: ENDPOINTS.CREDIT_CARDS,
            method: "GET"
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function getCreditCard(id: number): ReturnType<ICreditCard> {
    try {
        const result = await request<ICreditCard>({
            url: `${ENDPOINTS.CREDIT_CARDS}/${id}`,
            method: "GET"
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function createCreditCard(data: ICreateCreditCardRequest): ReturnType<ICreditCard> {
    try {
        const result = await request<ICreditCard>({
            url: ENDPOINTS.CREDIT_CARDS,
            method: "POST",
            body: data
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function updateCreditCard(id: number, data: IUpdateCreditCardRequest): ReturnType<ICreditCard> {
    try {
        const result = await request<ICreditCard>({
            url: `${ENDPOINTS.CREDIT_CARDS}/${id}`,
            method: "PATCH",
            body: data
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function removeCreditCard(id: number): ReturnType<IRemoveCreditCardResponse> {
    try {
        await request({
            url: `${ENDPOINTS.CREDIT_CARDS}/${id}`,
            method: "DELETE"
        });

        return {
            creditCardToDeleteId: id
        };
    } catch (error) {
        return AppError.from(error);
    }
}

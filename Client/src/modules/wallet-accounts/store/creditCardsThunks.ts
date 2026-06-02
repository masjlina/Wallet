// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {
    createCreditCard,
    getAllCreditCards,
    getCreditCard,
    removeCreditCard,
    updateCreditCard
} from "@/modules/wallet-accounts";
import type {IRemoveCreditCardResponse} from "@/modules/wallet-accounts/api/types/removeCreditCardResponse.ts";
import {showNotification} from "@/app/store/notificationSlice";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";

// Shared
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";
import type {ICreditCard} from "@/domain/creditCard.ts";
import type {ICreateCreditCardRequest} from "@/modules/wallet-accounts/api/types/createCreditCardRequest.ts";
import type {IUpdateCreditCardRequest} from "@/modules/wallet-accounts/api/types/updateCreditCardRequest.ts";

interface IUpdateCreditCardDataType {
    id: number,
    creditCard: IUpdateCreditCardRequest;
}

export const getAllWalletCreditCards = createAsyncThunk<ICreditCard[], void>(
    "/getAllCreditCards",
    async (_, {rejectWithValue}) => {
        const response = await getAllCreditCards();

        return returnRejectOrResult<ICreditCard[]>(response, rejectWithValue);
    }
);

export const getWalletCreditCard = createAsyncThunk<ICreditCard, number>(
    "/getCreditCard",
    async (id, {rejectWithValue}) => {
        const response = await getCreditCard(id);

        return returnRejectOrResult<ICreditCard>(response, rejectWithValue);
    }
);

export const createWalletCreditCard = createAsyncThunk<ICreditCard, ICreateCreditCardRequest>(
    "/createCreditCard",
    async (data, {dispatch, rejectWithValue}) => {
        const response = await createCreditCard(data);
        const result = returnRejectOrResult<ICreditCard>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was created"
        }));

        return result;
    }
);

export const updateWalletCreditCard = createAsyncThunk<ICreditCard, IUpdateCreditCardDataType>(
    "/updateCreditCard",
    async ({id, creditCard}, {dispatch, rejectWithValue}) => {
        const response = await updateCreditCard(id, creditCard);
        const result = returnRejectOrResult<ICreditCard>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was updated"
        }));

        return result;
    }
);

export const removeWalletCreditCard = createAsyncThunk<IRemoveCreditCardResponse, number>(
    "/removeCreditCard",
    async (id, {dispatch, rejectWithValue}) => {
        const response = await removeCreditCard(id);
        const result = returnRejectOrResult<IRemoveCreditCardResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was deleted"
        }));

        return result;
    }
);

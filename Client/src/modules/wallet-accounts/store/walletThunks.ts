// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {createWallet, getWallet, updateWallet} from "../api/walletApi";
import type {IUpdateWalletRequest} from "@/modules/wallet-accounts/api/types/updateWalletRequest.ts";
import {showNotification} from "@/app/store/notificationSlice";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";

// Shared
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";
import type {IWallet} from "@/domain/wallet.ts";
import type {ICreateWalletRequest} from "@/modules/wallet-accounts/api/types/createWalletRequest.ts";

interface IUpdateUserWalletRequest {
    id: number;
    wallet: IUpdateWalletRequest;
}

export const getUserWallet = createAsyncThunk<IWallet, void>(
    "wallet-accounts/get",
    async (_, {rejectWithValue}) => {
        const response = await getWallet();

        return returnRejectOrResult<IWallet>(response, rejectWithValue);
    }
);

export const createUserWallet = createAsyncThunk<IWallet, ICreateWalletRequest>(
    "wallet-accounts/create",
    async (data, {dispatch, rejectWithValue}) => {
        const response = await createWallet(data);
        const result = returnRejectOrResult<IWallet>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Wallet was created"
        }));

        return result;
    }
);

export const updateUserWallet = createAsyncThunk<IWallet, IUpdateUserWalletRequest>(
    "wallet-accounts/update",
    async ({id, wallet}, {dispatch, rejectWithValue}) => {
        const response = await updateWallet(id, wallet);
        const result = returnRejectOrResult<IWallet>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Wallet was updated"
        }));

        return result;
    }
);

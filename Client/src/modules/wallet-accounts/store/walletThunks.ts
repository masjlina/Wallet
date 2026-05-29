// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {createWallet, getWallet, updateWallet} from "../api/walletApi";
import type {IUpdateWalletRequest} from "@/modules/wallet-accounts/api/types/updateWalletRequest.ts";
import type {IWalletResponse} from "@/modules/wallet-accounts/api/types/walletResponse.ts";
import {showNotification} from "@/app/store/notificationSlice";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";

// Shared
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";

interface IUpdateUserWalletRequest {
    walletId: number;
    wallet: IUpdateWalletRequest;
}

export const getUserWallet = createAsyncThunk<IWalletResponse, void>(
    "wallet-accounts/get",
    async (_, {rejectWithValue}) => {
        const response = await getWallet();

        return returnRejectOrResult<IWalletResponse>(response, rejectWithValue);
    }
);

export const createUserWallet = createAsyncThunk<IWalletResponse, string>(
    "wallet-accounts/create",
    async (walletName, {dispatch, rejectWithValue}) => {
        const response = await createWallet(walletName);
        const result = returnRejectOrResult<IWalletResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Wallet was created"
        }));

        return result;
    }
);

export const updateUserWallet = createAsyncThunk<IWalletResponse, IUpdateUserWalletRequest>(
    "wallet-accounts/update",
    async ({walletId, wallet}, {dispatch, rejectWithValue}) => {
        const response = await updateWallet(walletId, wallet);
        const result = returnRejectOrResult<IWalletResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Wallet was updated"
        }));

        return result;
    }
);

// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {createWallet, getWallet, updateWallet} from "../api/walletApi";
import {showNotification} from "@/app/store/notificationSlice";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";

export const getUserWallet = createAsyncThunk(
    "wallet-accounts/get",
    async (arg, thunkAPI) => {
        const response = await getWallet();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)

export const createUserWallet = createAsyncThunk(
    "wallet-accounts/create",
    async (walletName, {dispatch, rejectWithValue}) => {
        const response = await createWallet(walletName);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Wallet was not created"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Wallet was created"
        }));

        return response;
    }
);

export const updateUserWallet = createAsyncThunk(
    "wallet-accounts/update",
    async ({walletId, wallet}, {dispatch, rejectWithValue}) => {
        const response = await updateWallet(walletId, wallet);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Wallet was not updated"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Wallet was updated"
        }));

        return response;
    }
);

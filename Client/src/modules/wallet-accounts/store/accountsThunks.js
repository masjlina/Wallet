// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {createAccount, getAccount, getAllAccounts, removeAccount, updateAccount} from "../api/accountsApi";
import {showNotification} from "@/app/store/notificationSlice";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";

export const getAllWalletAccounts = createAsyncThunk(
    "/getAllAccounts",
    async (arg, thunkAPI) => {
        const response = await getAllAccounts();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)

export const getWalletAccount = createAsyncThunk(
    "/getAccount",
    async (accountId, thunkAPI) => {
        const response = await getAccount(accountId);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)

export const createWalletAccount = createAsyncThunk(
    "/createAccount",
    async (account, {dispatch, rejectWithValue}) => {
        const response = await createAccount(account);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Account was not created"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was created"
        }));

        return response
    }
);

export const updateWalletAccount = createAsyncThunk(
    "/updateAccount",
    async ({accountId, account}, {dispatch, rejectWithValue}) => {
        const response = await updateAccount(accountId, account);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Account was not updated"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was updated"
        }));

        return response
    }
);

export const removeWalletAccount = createAsyncThunk(
    "/removeAccount",
    async (accountId, {dispatch, rejectWithValue}) => {
        const response = await removeAccount(accountId);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Account was not deleted"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was deleted"
        }));

        return response;
    }
)

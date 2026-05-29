// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {createAccount, getAccount, getAllAccounts, removeAccount, updateAccount} from "../api/accountsApi";
import type {IAccountResponse} from "@/modules/wallet-accounts/api/types/accountResponse.ts";
import type {IAccountsResponse} from "@/modules/wallet-accounts/api/types/accountsResponse.ts";
import type {ICreateAccountRequest} from "@/modules/wallet-accounts/api/types/createAccountRequest.ts";
import type {IRemoveAccountResponse} from "@/modules/wallet-accounts/api/types/removeAccountResponse.ts";
import type {IUpdateAccountRequest} from "@/modules/wallet-accounts/api/types/updateAccountRequest.ts";
import {showNotification} from "@/app/store/notificationSlice";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";

// Shared
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";

interface IUpdateWalletAccountRequest {
    accountId: number;
    account: IUpdateAccountRequest;
}

export const getAllWalletAccounts = createAsyncThunk<IAccountsResponse, void>(
    "/getAllAccounts",
    async (_, {rejectWithValue}) => {
        const response = await getAllAccounts();

        return returnRejectOrResult<IAccountsResponse>(response, rejectWithValue);
    }
);

export const getWalletAccount = createAsyncThunk<IAccountResponse, number>(
    "/getAccount",
    async (accountId, {rejectWithValue}) => {
        const response = await getAccount(accountId);

        return returnRejectOrResult<IAccountResponse>(response, rejectWithValue);
    }
);

export const createWalletAccount = createAsyncThunk<IAccountResponse, ICreateAccountRequest>(
    "/createAccount",
    async (account, {dispatch, rejectWithValue}) => {
        const response = await createAccount(account);
        const result = returnRejectOrResult<IAccountResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was created"
        }));

        return result;
    }
);

export const updateWalletAccount = createAsyncThunk<IAccountResponse, IUpdateWalletAccountRequest>(
    "/updateAccount",
    async ({accountId, account}, {dispatch, rejectWithValue}) => {
        const response = await updateAccount(accountId, account);
        const result = returnRejectOrResult<IAccountResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was updated"
        }));

        return result;
    }
);

export const removeWalletAccount = createAsyncThunk<IRemoveAccountResponse, number>(
    "/removeAccount",
    async (accountId, {dispatch, rejectWithValue}) => {
        const response = await removeAccount(accountId);
        const result = returnRejectOrResult<IRemoveAccountResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Account was deleted"
        }));

        return result;
    }
);

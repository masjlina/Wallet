import {createAsyncThunk} from "@reduxjs/toolkit";
import onReject from "../../../../store/onReject";
import {createAccount, getAllAccounts, removeAccount} from "../api/accountsApi";

export const getAllWalletAccounts = createAsyncThunk(
    "/getAllAccounts",
    async (arg, thunkAPI) => {
        const response = await getAllAccounts();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)

export const createWalletAccount = createAsyncThunk(
    "/createAccount",
    async (account, thunkAPI) => {
        const response = await createAccount(account);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response
    }
);

export const removeWalletAccount = createAsyncThunk(
    "/removeAccount",
    async (accountId, thunkAPI) => {
        const response = await removeAccount(accountId);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)
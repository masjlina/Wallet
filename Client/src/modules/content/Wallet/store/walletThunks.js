import {createAsyncThunk} from "@reduxjs/toolkit";
import {createWallet, getWallet, updateWallet} from "../api/walletApi";
import onReject from "../../../../store/onReject";

export const getUserWallet = createAsyncThunk(
    "wallet/get",
    async (arg, thunkAPI) => {
        const response = await getWallet();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)

export const createUserWallet = createAsyncThunk(
    "wallet/create",
    async (walletName, thunkAPI) => {
        const response = await createWallet(walletName);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);

export const updateUserWallet = createAsyncThunk(
    "wallet/update",
    async ({walletId, wallet}, thunkAPI) => {
        const response = await updateWallet(walletId, wallet);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);
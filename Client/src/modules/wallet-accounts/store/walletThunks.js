// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {createWallet, getWallet, updateWallet} from "../api/walletApi";

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
    async (walletName, thunkAPI) => {
        const response = await createWallet(walletName);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);

export const updateUserWallet = createAsyncThunk(
    "wallet-accounts/update",
    async ({walletId, wallet}, thunkAPI) => {
        const response = await updateWallet(walletId, wallet);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);
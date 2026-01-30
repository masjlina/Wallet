import {createAsyncThunk} from "@reduxjs/toolkit";
import {createWallet, getWallet} from "../api/walletApi";
import onReject from "../../../../store/onReject";

export const getUserWallet = createAsyncThunk(
    "/getWallet",
    async (arg, thunkAPI) => {
        const response = await getWallet();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)

export const createUserWallet = createAsyncThunk(
    "/createWallet",
    async (walletName, thunkAPI) => {
        const response = await createWallet(walletName);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)
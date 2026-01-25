import {createAsyncThunk} from "@reduxjs/toolkit";
import {getWallet} from "../api/walletApi";
import onReject from "../../../../store/onReject";

export const getUserWallet = createAsyncThunk(
    "/getWallet",
    async (userId, thunkAPI) => {
        const response = await getWallet(userId);

        onReject(response, thunkAPI);

        return response;
    }
)

export const createUserWallet = createAsyncThunk(
    "/createWallet",
    async (wallet, thunkAPI) => {
        // const response = await
    }
)
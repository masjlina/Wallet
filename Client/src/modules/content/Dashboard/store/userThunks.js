import {createAsyncThunk} from "@reduxjs/toolkit";
import onReject from "../../../../store/onReject";
import {getUser, updateUser} from "../api/userApi";

export const getApplicationUser = createAsyncThunk(
    "user/get",
    async (arg, thunkAPI) => {
        const response = await getUser();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);

export const updateApplicationUser = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {
        const response = await updateUser(user);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);
import {createAsyncThunk} from "@reduxjs/toolkit";

import {checkAuth, login, register} from "../api/authApi";
import onReject from "../../../store/onReject";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
        const response = await register(formData);

        const rejected = onReject(response, thunkAPI);

        if (rejected) return rejected;

        return response;
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, thunkAPI) => {
        const response = await login(formData);

        const rejected = onReject(response, thunkAPI);

        if (rejected) return rejected;

        return response;
    }
);

export const checkUserAuth = createAsyncThunk(
    "auth/checkAuth",
    async (arg, thunkAPI) => {
        const response = await checkAuth();

        const rejected = onReject(response, thunkAPI);

        if (rejected) return rejected;

        return response;
    }
);
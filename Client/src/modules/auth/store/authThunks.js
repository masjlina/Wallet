// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {checkAuth, login, register} from "@/modules/auth/api/authApi";

export const registerUser = createAsyncThunk(
    "store/registerUser",
    async (formData, thunkAPI) => {
        const response = await register(formData);

        const rejected = onReject(response, thunkAPI);

        if (rejected) return rejected;

        return response;
    }
);

export const loginUser = createAsyncThunk(
    "store/loginUser",
    async (formData, thunkAPI) => {
        const response = await login(formData);

        const rejected = onReject(response, thunkAPI);

        if (rejected) return rejected;

        return response;
    }
);

export const checkUserAuth = createAsyncThunk(
    "store/checkAuth",
    async (arg, thunkAPI) => {
        const response = await checkAuth();

        const rejected = onReject(response, thunkAPI);

        if (rejected) return rejected;

        return response;
    }
);
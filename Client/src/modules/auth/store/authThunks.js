// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {checkAuth, login, logout, register} from "@/modules/auth/api/authApi";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, {dispatch, rejectWithValue}) => {
        const response = await register(formData);

        const rejected = onReject(response, rejectWithValue);

        if (rejected) {
            return rejected;
        }

        return response;
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, {dispatch, rejectWithValue}) => {
        const response = await login(formData);

        const rejected = onReject(response, rejectWithValue);

        if (rejected) {
            return rejected;
        }

        return response;
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (formData, {dispatch, rejectWithValue}) => {
        const response = await logout();

        const rejected = onReject(response, rejectWithValue);

        if (rejected) {
            return rejected;
        }

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

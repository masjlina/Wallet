import {createAsyncThunk} from "@reduxjs/toolkit";

import {login, register} from "../api/authenticationAdapter";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
        const response = await register(formData);

        if (!response.isSuccessful) {
            return thunkAPI.rejectWithValue({errors: [...Object.values(response.errors)] ?? []});
        }

        return response;
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, thunkAPI) => {
        const response = await login(formData);

        if (!response.isSuccessful) {
            return thunkAPI.rejectWithValue({errors: [...Object.values(response.errors)] ?? []});
        }

        return response;
    }
);


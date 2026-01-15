import {createAsyncThunk} from "@reduxjs/toolkit";

import {login, register} from "../api/authenticationAdapter";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData) => {
        const response = await register(formData);

        return response;
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData) => {
        const response = await login(formData);

        return response;
    });


// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {changePassword, checkAuth, login, logout, register} from "@/modules/auth/api/authApi";
import {showNotification} from "@/app/store/notificationSlice";
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";
import type {ISignUpRequest} from "@/modules/auth/api/types/signUpRequest.ts";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";
import type {ISuccessfulResponse} from "@/shared/api/successfulResponse.ts";
import type {ISignInRequest} from "@/modules/auth/api/types/signInRequest.ts";
import type {ISignInResponse} from "@/modules/auth/api/types/signInResponse.ts";
import type {ICheckAuthResponse} from "@/modules/auth/api/types/checkAuthResponse.ts";
import type {IChangePasswordRequest} from "@/modules/auth/api/types/changePasswordRequest.ts";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: ISignUpRequest, {rejectWithValue}) => {
        const response = await register(data);

        return returnRejectOrResult<ISuccessfulResponse>(response, rejectWithValue);
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data: ISignInRequest, {rejectWithValue}) => {
        const response = await login(data);

        return returnRejectOrResult<ISignInResponse>(response, rejectWithValue);
    }
);

export const logoutUser = createAsyncThunk<ISuccessfulResponse, void>(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        const response = await logout();

        return returnRejectOrResult<ISuccessfulResponse>(response, rejectWithValue);
    }
);

export const checkUserAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, {rejectWithValue}) => {
        const response = await checkAuth();

        return returnRejectOrResult<ICheckAuthResponse>(response, rejectWithValue);
    }
);

export const changeUserPassword = createAsyncThunk<ISuccessfulResponse, IChangePasswordRequest>(
    "auth/changePassword",
    async (data, { dispatch, rejectWithValue }) => {
        const response = await changePassword(data);

        const result = returnRejectOrResult<ISuccessfulResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Password was changed"
        }));

        return result;
    }
);

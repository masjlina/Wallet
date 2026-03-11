// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {changePassword, checkAuth, login, logout, register} from "@/modules/auth/api/authApi";
import {showNotification} from "@/app/store/notificationSlice";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";

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

export const changeUserPassword = createAsyncThunk(
    "auth/changePassword",
    async (data, {dispatch, rejectWithValue}) => {
        const response = await changePassword(data);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Password was not changed"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Password was changed"
        }));

        return response;
    }
);

// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {checkAuth, login, register} from "@/modules/auth/api/authApi";
import {showNotification} from "@/app/store/notificationSlice";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";

export const registerUser = createAsyncThunk(
    "store/registerUser",
    async (formData, {dispatch, rejectWithValue}) => {
        const response = await register(formData);

        const rejected = onReject(response, rejectWithValue);

        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Registration failed"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Registration completed"
        }));

        return response;
    }
);

export const loginUser = createAsyncThunk(
    "store/loginUser",
    async (formData, {dispatch, rejectWithValue}) => {
        const response = await login(formData);

        const rejected = onReject(response, rejectWithValue);

        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Login failed"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Logged in successfully"
        }));

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

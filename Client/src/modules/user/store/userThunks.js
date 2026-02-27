// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {getUser, updateUser} from "../api/userApi";
import {showNotification} from "@/app/store/notificationSlice";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";

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
    async (user, {dispatch, rejectWithValue}) => {
        const response = await updateUser(user);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Profile was not updated"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Profile was updated"
        }));

        return response;
    }
);

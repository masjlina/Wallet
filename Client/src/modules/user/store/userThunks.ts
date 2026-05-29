// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {getUser, removeAvatar, updateUser, uploadAvatar} from "@/modules/user/api/userApi";
import type {IUpdateUserRequest} from "@/modules/user/api/types/updateUserRequest.ts";
import {showNotification} from "@/app/store/notificationSlice";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";
import type {IUser} from "@/domain/user.ts";

// Shared
import {type ISuccessfulResponse} from "@/shared/api/successfulResponse.ts";
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";

export const getApplicationUser = createAsyncThunk<IUser, void>(
    "user/get",
    async (_, {rejectWithValue}) => {
        const response = await getUser();

        return returnRejectOrResult<IUser>(response, rejectWithValue);
    }
);

export const updateApplicationUser = createAsyncThunk<IUser, IUpdateUserRequest>(
    "user/update",
    async (user, {dispatch, rejectWithValue}) => {
        const response = await updateUser(user);
        const result = returnRejectOrResult<IUser>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Profile was updated"
        }));

        return result;
    }
);

export const uploadApplicationUserAvatar = createAsyncThunk<IUser, FormData>(
    "user/avatar/upload",
    async (data, {dispatch, rejectWithValue}) => {
        const response = await uploadAvatar(data);
        const result = returnRejectOrResult<IUser>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Avatar was updated"
        }));

        return result;
    }
);

export const removeApplicationUserAvatar = createAsyncThunk<ISuccessfulResponse, void>(
    "user/avatar/remove",
    async (_, {dispatch, rejectWithValue}) => {
        const response = await removeAvatar();
        const result = returnRejectOrResult<ISuccessfulResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Avatar was removed"
        }));

        return result;
    }
);

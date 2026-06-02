// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import {
    getApplicationUser,
    removeApplicationUserAvatar,
    updateApplicationUser,
    uploadApplicationUserAvatar
} from "./userThunks";
import {checkUserAuth, logoutUser} from "@/modules/auth/store/authThunks";
import type {IUser} from "@/domain/user.ts";

interface IUserState {
    user: IUser | null
}

const initialState: IUserState = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApplicationUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(updateApplicationUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(uploadApplicationUserAvatar.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(removeApplicationUserAvatar.fulfilled, (state) => {
                if (state.user) {
                    state.user.avatarUri = "";
                }
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.user = null;
            });
    }
});

export default userSlice.reducer;

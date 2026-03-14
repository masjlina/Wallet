// External libs
import {createSlice} from "@reduxjs/toolkit";

// App (modules)
import {
    getApplicationUser,
    removeApplicationUserAvatar,
    updateApplicationUser,
    uploadApplicationUserAvatar
} from "./userThunks";
import {checkUserAuth, logoutUser} from "@/modules/auth/store/authThunks";

const initialState = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getApplicationUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateApplicationUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(uploadApplicationUserAvatar.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(removeApplicationUserAvatar.fulfilled, (state, action) => {
                state.user.avatarUri = "";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.user = null;
            })
    }
});

export default userSlice.reducer;

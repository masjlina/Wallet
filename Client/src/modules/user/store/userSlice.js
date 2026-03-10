// External libs
import {createSlice} from "@reduxjs/toolkit";

// App (modules)
import {
    getApplicationUser,
    removeApplicationUserAvatar,
    updateApplicationUser,
    uploadApplicationUserAvatar
} from "./userThunks";

const initialState = {
    user: null
}

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
        }
    }
)

export default userSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";
import {getApplicationUser, updateApplicationUser} from "./userThunks";

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
        }
    }
)

export default userSlice.reducer;
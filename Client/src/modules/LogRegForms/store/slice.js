import {createSlice} from "@reduxjs/toolkit";
import {loginUser} from "./thunks";

import {status} from "../../../consts/status";

const initialState = {
    user: null,
    isAuthenticated: false,
    status: status.IDLE,
    error: null
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        })
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"),
                (state) => {
                    state.status = status.LOADING;
                    state.error = null;
                }
            )
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = status.SUCCEEDED;
                }
            )
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = status.FAILED;
                    state.error = action.payload ?? action.error?.message;
                }
            )
    }
});

const {actions, reducer} = slice

export default reducer;
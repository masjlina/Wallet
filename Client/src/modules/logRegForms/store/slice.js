import {createSlice} from "@reduxjs/toolkit";
import {loginUser} from "./thunks";

import status from "../../../consts/status";

const initialState = {
    user: null,
    isAuthenticated: false,
    status: status.IDLE,
    errors: []
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        clearErrors: (state) => {
            state.errors = [];
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.errors = [];
            state.status = status.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"),
                (state) => {
                    state.status = status.LOADING;
                    state.errors = [];
                }
            )
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = status.SUCCEEDED;
                    state.errors = [];
                }
            )
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = status.FAILED;
                    state.errors = action.payload?.errors ?? action.payload ?? ["Something went wrong"];
                }
            )
    }
});

export const {setErrors, logout, clearErrors} = slice.actions;
export default slice.reducer;
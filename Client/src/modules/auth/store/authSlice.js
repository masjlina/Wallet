// External libs
import {createSlice} from "@reduxjs/toolkit";

// App (modules)
import {checkUserAuth, loginUser} from "./authThunks";

// Shared
import STATUSES from "@/shared/consts/statuses";

const initialState = {
    user: null,
    isAuthenticated: false,
    status: STATUSES.IDLE,
    errors: []
}

const authSlice = createSlice({
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
            state.status = STATUSES.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
            .addCase(checkUserAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addMatcher((action) => action.type.startsWith("store/") && action.type.endsWith("/pending"),
                (state) => {
                    state.status = STATUSES.LOADING;
                    state.errors = [];
                }
            )
            .addMatcher((action) => action.type.startsWith("store/") && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = STATUSES.SUCCEEDED;
                    state.errors = [];
                }
            )
            .addMatcher((action) => action.type.startsWith("store/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = STATUSES.FAILED;
                    state.errors = action.payload?.errors ?? action.payload ?? ["Something went wrong"];
                }
            )
    }
});

export const {setErrors, logout, clearErrors} = authSlice.actions;
export default authSlice.reducer;
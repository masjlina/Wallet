// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import {checkUserAuth, loginUser, logoutUser} from "./authThunks";

// Shared
import {STATUSES, type StatusType} from "@/shared/consts/statuses";
import {clearAccessToken} from "@/shared/utils/tokenManager";
import type {IUser} from "@/domain/user.ts";
import type {ISignInResponse} from "@/modules/auth/api/types/signInResponse.ts";
import type {ICheckAuthResponse} from "@/modules/auth/api/types/checkAuthResponse.ts";

export interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean,
    status: StatusType,
    errors: string[] | []
}

const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    status: STATUSES.IDLE,
    errors: []
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setErrors: (state, action: PayloadAction<string[]>) => {
            state.errors = action.payload;
        },
        clearErrors: (state) => {
            state.errors = [];
        },
        logout: (state) => {
            clearAccessToken();
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<ISignInResponse>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
            .addCase(checkUserAuth.fulfilled, (state, action: PayloadAction<ICheckAuthResponse>) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                clearAccessToken();
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"),
                (state) => {
                    state.status = STATUSES.LOADING;
                    state.errors = [];
                }
            )
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = STATUSES.SUCCEEDED;
                    state.errors = [];
                }
            )
            .addMatcher((action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
                (state, action: PayloadAction<any>) => {
                    state.status = STATUSES.FAILED;
                    state.errors = action.payload?.messages ?? action.payload ?? ["Something went wrong"];
                }
            )
    }
});

export const {setErrors, clearErrors, logout} = authSlice.actions;
export default authSlice.reducer;

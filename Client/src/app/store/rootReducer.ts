import {combineReducers, type UnknownAction} from "@reduxjs/toolkit";
import {authSlice} from "@/modules/auth";
import {accountsSlice, walletSlice} from "@/modules/wallet-accounts";
import {transactionsSlice} from "@/modules/transactions";
import {userSlice} from "@/modules/user";
import notificationSlice from "@/app/store/notificationSlice";
import {logoutUser} from "@/modules/auth/store/authThunks";

const appReducer = combineReducers({
    auth: authSlice,
    wallet: walletSlice,
    accounts: accountsSlice,
    transactions: transactionsSlice,
    user: userSlice,
    notification: notificationSlice,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (
    state: RootState | undefined,
    action: UnknownAction) => {
    if (action.type === logoutUser.fulfilled.type) {
        return appReducer(undefined, action)

    }

    return appReducer(state, action);
};
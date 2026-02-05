import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../modules/logRegForms/store/slice";
import walletSlice from "../modules/content/Wallet/store/walletSlice";
import accountsSlice from "../modules/content/Wallet/store/accountsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        wallet: walletSlice,
        accounts: accountsSlice
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;
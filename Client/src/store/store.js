import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../modules/logRegForms/store/slice";
import walletSlice from "../modules/content/Wallet/store/slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        wallet: walletSlice
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;
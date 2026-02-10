import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../modules/logRegForms/store/slice";
import walletSlice from "../modules/content/Wallet/store/walletSlice";
import accountsSlice from "../modules/content/Wallet/store/accountsSlice";
import transactionsSlice from "../modules/content/Wallet/store/transactionsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        wallet: walletSlice,
        accounts: accountsSlice,
        transactions: transactionsSlice
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;
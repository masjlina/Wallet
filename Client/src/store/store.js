import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../modules/logRegForms/store/slice";
import walletSlice from "../modules/content/Wallet/store/walletSlice";
import accountsSlice from "../modules/content/Wallet/store/accountsSlice";
import transactionsSlice from "../modules/content/Wallet/store/transactionsSlice";
import userSlice from "../modules/content/Dashboard/store/userSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        wallet: walletSlice,
        accounts: accountsSlice,
        transactions: transactionsSlice,
        user: userSlice
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;
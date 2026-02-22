// External libs
import {configureStore} from "@reduxjs/toolkit";

// App (modules)
import {authSlice} from "@/modules/auth";
import {transactionsSlice} from "@/modules/transactions";
import {userSlice} from "@/modules/user";
import {accountsSlice} from "@/modules/wallet-accounts";
import {walletSlice} from "@/modules/wallet-accounts";

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

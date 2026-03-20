// External libs
import {configureStore} from "@reduxjs/toolkit";

// App (modules)
import {authSlice} from "@/modules/auth";
import {transactionsSlice} from "@/modules/transactions";
import {userSlice} from "@/modules/user";
import {accountsSlice} from "@/modules/wallet-accounts";
import {walletSlice} from "@/modules/wallet-accounts";
import notificationSlice from "@/app/store/notificationSlice";
import {rootReducer} from "@/app/store/rootReducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production"
});

export default store;

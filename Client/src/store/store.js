import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../modules/LogRegForms/store/slice";

const store = configureStore({
    reducer: {
        auth: authSlice
    },
    devTools: process.env.NODE_ENV !== "production"
});

export default store;
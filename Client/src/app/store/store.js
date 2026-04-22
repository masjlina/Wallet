// External libs
import {configureStore} from "@reduxjs/toolkit";

// App (modules)
import {rootReducer} from "@/app/store/rootReducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production"
});

export default store;

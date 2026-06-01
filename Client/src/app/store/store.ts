// External libs
import {configureStore} from "@reduxjs/toolkit";

// App (modules)
import {rootReducer} from "@/app/store/rootReducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export default store;

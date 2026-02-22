// React
import React from "react";
import {createRoot} from "react-dom/client";

// External libs
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

// App (modules)
import App from "@/app/App";
import store from "@/app/store/store";

// Styles
import "./shared/styles/reset.css";
import "./shared/styles/style.css";
import "./shared/styles/variables.css";

const root = createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);

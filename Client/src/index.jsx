import React from "react";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import App from "./components/App/App";
import store from "./store/store";

import "./styles/style.css";
import "./styles/reset.css";
import "./styles/variables.css";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

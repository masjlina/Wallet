import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App/App";

import "./styles/style.css";
import "./styles/reset.css";
import "./styles/variables.css";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

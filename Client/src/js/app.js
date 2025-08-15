"use strict;"

import { LoginView } from "./views/LoginView.js";
import {navigateTo} from "./utils/index";

function router() {
    navigateTo(window.location.hash);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#/login'; 
    } else {
        router();
    }
});
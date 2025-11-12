"use strict";

import {navigateTo} from "./utils/index";
import {UnderlayView} from "./views/UnderlayView";
import {diContainer} from "./utils/DiContainer";
import urlPaths from "./utils/enumeration";

diContainer.register("underlay", new UnderlayView(document.querySelector("body")));


window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#/login'; 
    } else {
        navigateTo(urlPaths.home);
    }
});
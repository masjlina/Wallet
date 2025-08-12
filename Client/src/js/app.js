"use strict;"

import { LoginView } from "./views/LoginView.js";

const parent = document.querySelector("body");

parent.innerHTML = "";
const loginView = new LoginView(parent);

loginView.mount(parent);



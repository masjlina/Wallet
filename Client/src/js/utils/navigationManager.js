import {LoginView} from "../views/LoginView";
import {RegistrationView} from "../views/RegistrationView";

const parent = document.querySelector("body");

export default function navigateTo(url) {
    if (url.startsWith("#")) {
        url = url.slice(1);
    }
    
    parent.innerHTML = "";

    switch (url) {
        case "/":
        case "":
        case "/login":
        {
            const loginView = new LoginView(parent);
            loginView.mount();
            window.location.hash = "#/login";
            break;
        } case "/registration": {
            const registrationView = new RegistrationView(parent);
            registrationView.mount(parent);
            window.location.hash = "#/registration";
            break;
        }
    }
}
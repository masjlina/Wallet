import {LoginView} from "../views/LoginView";
import {RegistrationView} from "../views/RegistrationView";

const parent = document.querySelector("body");
parent.innerHTML = "";

export default function navigateTo(url) {
    switch (url) {
        case "/login":
        {
            const loginView = new LoginView(parent);
            loginView.mount(parent);
            break;
        } case "/registration": {
            const registrationView = new RegistrationView(parent);
            registrationView.mount(parent);
            break;
        }
    }
}
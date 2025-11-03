import {LoginView} from "../views/LoginView";
import {RegistrationView} from "../views/RegistrationView";
import {DashboardView} from "../views/DashboardView";

const parent = document.querySelector("body");

export default function navigateTo(url) {
    if (url.startsWith("#")) {
        url = url.slice(1);
    }
    
    parent.innerHTML = "";

    switch (url) {
        case "/": {
            const dashboardView = new DashboardView(parent);
            dashboardView.mountView();
            window.location.hash = "#/";
            break;
        }
        case "":
        case "/login":
        {
            const loginView = new LoginView(parent);
            loginView.mountView();
            window.location.hash = "#/login";
            break;
        } case "/registration": {
            const registrationView = new RegistrationView(parent);
            registrationView.mountView();
            window.location.hash = "#/registration";
            break;
        }
    }
}
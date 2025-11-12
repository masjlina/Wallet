import {DashboardView} from "../views/DashboardView";
import {TransactionsView} from "../views/TransactionsView";
import {RegistrationView} from "../views/RegistrationView";
import {LoginView} from "../views/LoginView";

const parent = document.querySelector("body");

export default function navigateTo(url) {
    if (window.location.hash === url) {
        console.log("already here");
    }
    
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
        
        case "/transactions": {
            const transactionsView = new TransactionsView(parent);
            transactionsView.mountView();
            window.location.hash = "#/transactions";
            break
        }
        
        case "":
            case "/login":
        {
            const loginView = new LoginView(parent);
            loginView.mountView();
            window.location.hash = "#/login";
            break;
        } 
        case "/registration": {
            const registrationView = new RegistrationView(parent);
            registrationView.mountView();
            window.location.hash = "#/registration";
            break;
        }
    }
}
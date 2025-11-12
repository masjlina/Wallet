import {DashboardView} from "../views/DashboardView";
import {TransactionsView} from "../views/TransactionsView";
import {RegistrationView} from "../views/RegistrationView";
import {LoginView} from "../views/LoginView";
import urlPaths from "./enumeration";
let currentView = null;

export default function navigateTo(url) {
    const body = document.querySelector("body");
    const content = body.querySelector(".content__wrapper");

    let parent = body;


    if (content !== null) {
        parent = content;
    }

    if (window.location.hash === url) {
        console.log("already here");
    }
    if (currentView) {
        currentView?.unmount();
    } else {
        parent.innerHTML = "";       
    }

    switch (url) {
        case urlPaths.home: {
            currentView = new DashboardView(parent);
            currentView.mountView();
            window.location.hash = urlPaths.home;
            break;
        }

        case urlPaths.transactions: {
            currentView = new TransactionsView(parent);
            currentView.mountView();
            window.location.hash = urlPaths.transactions;
            break
        }

        case urlPaths.login: {
            currentView = new LoginView(parent);
            currentView.mountView();
            window.location.hash = urlPaths.login;
            break;
        }
        case urlPaths.registration: {
            currentView = new RegistrationView(parent);
            currentView.mountView();
            window.location.hash = urlPaths.registration;
            break;
        }
    }
}
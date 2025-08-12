import {Main, Div, Img, Form, Label, Input, Button, Span, P, A} from "../components/index.js";
import {View} from "../core/View.js";
import {LoginController} from "../controllers/LoginController.js";

export class LoginView extends View {
    constructor() {
        super(new LoginController());
    }

    init() {
        this.main = new Main({
            classList: "container",
            children: [
                new Div({
                    classList: "log-reg-wrapper",
                    children: [
                        new Img({
                            classList: "logo",
                            src: "img/logo.svg",
                            alt: "Spend tracker"
                        }),

                        // Sign up Form
                        new Form({
                            classList: "input-section",
                            action: "#",
                            method: "post",
                            children: [
                                new Div({
                                    classList: "input-section__fields",
                                    children: [

                                        // Email Input
                                        new Div({
                                            classList: "input-section__field",
                                            children: [
                                                new Label({
                                                    classList: "input-title",
                                                    forElement: "email-input",
                                                    text: "Email Address"
                                                }),
                                                new Input({
                                                    classList: "input-section__input",
                                                    placeholder: "Your email",
                                                    type: "email",
                                                    name: "email",
                                                    id: "email-input",
                                                    props: "required"
                                                })
                                            ]
                                        }),

                                        // Password Input
                                        new Div({
                                            classList: "input-section__field",
                                            children: [
                                                new Label({
                                                    classList: "input-title",
                                                    forElement: "password-input",
                                                    text: "Password"
                                                }),
                                                new Div({
                                                    classList: "input-section__password-wrapper",
                                                    children: [
                                                        new Input({
                                                            classList: "input-section__input",
                                                            placeholder: "Type your password",
                                                            type: "password",
                                                            name: "password",
                                                            id: "password-input",
                                                            props: "required"
                                                        }),
                                                        new Button({
                                                            classList: "input-section__eye input-section__eye--show",
                                                            type: "button"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),

                                        // Checkbox and Submit
                                        new Div({
                                            classList: "log-reg",
                                            children: [
                                                new Div({
                                                    classList: "remember-me",
                                                    children: [
                                                        new Input({
                                                            classList: "visually-hidden remember-me__input",
                                                            type: "checkbox",
                                                            id: "remember-me-checkbox"
                                                        }),
                                                        new Label({
                                                            classList: "remember-me__label",
                                                            forElement: "remember-me-checkbox",
                                                            children: [
                                                                new Span({
                                                                    classList: "remember-me__checkbox",
                                                                }),
                                                                new P({
                                                                    text: "Remember me"
                                                                }) 
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                this.subButton = new Button({
                                                    classList: "log-reg__button log-reg__button--primary",
                                                    type: "submit",
                                                    text: "Login"
                                                })
                                            ]
                                        }),
                                    ]
                                })
                            ]
                        }),

                        // Another option
                        new Div({
                            classList: "log-reg-alternative",
                            children: [
                                new Div({
                                    classList: "log-reg-alternative__or",
                                    children: [
                                        new P({
                                            classList: "log-reg-alternative__text",
                                            text: "or sign up"
                                        })
                                    ]
                                }),
                                new A({
                                    classList: "log-reg-alternative__ref",
                                    href: "#",
                                    text: "Create an account"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }

    async mount(parent) {
        await this.main.mount(parent);
        this.bindListeners();
    }
    
    bindListeners() {
        // create an event and pass a function like an argument
    }
}
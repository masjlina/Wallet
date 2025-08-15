import {Main, Div, Img, Form, Label, Input, Button, Span, P, A, showPasswordToggle} from "../components/index.js";
import {View} from "../core/View.js";
import {LoginController} from "../controllers/LoginController.js";
import {validate, navigateTo} from "../utils/index.js";

export class LoginView extends View {
    constructor(parent) {
        super(new LoginController(), parent);
        
        this.location = "/login";
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
                        this.form = new Form({
                            classList: "input-section",
                            action: "#",
                            method: "post",
                            props: "novalidate",
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
                                                    props: "required minlength='5' maxlength='254'"
                                                })
                                            ]
                                        }),

                                        // Password Input
                                        this.passwordField = new Div({
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
                                                            props: "required minlength='5'"
                                                        }),
                                                        this.btnEye = new Button({
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
                                this.refCreateAccount = new A({
                                    classList: "log-reg-alternative__ref",
                                    href: "#/registration",
                                    text: "Create an account"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }

    async mount() {
        await this.main.mount(this.parent);
        this.bindListeners();
    }
    
    unmount() {
        this.main.unmount();
    }
    
    formValidate() {
        validate(this.form.element); 
    }
    
    formSubmit(e) {
        e.preventDefault();
        validate((this.form.element));
    }
    
    redirectToRegistration(e) {
        e.preventDefault();
        navigateTo(this.refCreateAccount.href);
    }
    
    bindListeners() {
        this.btnEye.element.addEventListener("click", () => showPasswordToggle(this.passwordField.element));
        this.form.element.addEventListener("change", () => this.formValidate());
        this.form.element.addEventListener("submit", (e) => this.formSubmit(e));
        this.refCreateAccount.element.addEventListener("click", (e) => this.redirectToRegistration(e));
    }
}
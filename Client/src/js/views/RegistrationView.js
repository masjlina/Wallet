import {Main, Div, Img, Form, Label, Input, Button, Span, P, A, showPasswordToggle} from "../components/index.js";
import {View} from "../core/View.js";
import {validate, navigateTo} from "../utils/index.js";
import {RegistrationController} from "../controllers/RegistrationController";

export class RegistrationView extends View {
    constructor(parent) {
        super(new RegistrationController(), parent);
        
        this.location = "/registration";
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
                                        // Name Input
                                        new Div({
                                            classList: "input-section__double-field",
                                            children: [
                                                
                                                // First Name
                                                new Div({
                                                    classList: "input-section__field",
                                                    children: [
                                                        new Label({
                                                            classList: "input-title",
                                                            forElement: "first-name-input",
                                                            text: "First Name"
                                                        }),
                                                        new Input({
                                                            classList: "input-section__input",
                                                            placeholder: "Your first name",
                                                            type: "text",
                                                            name: "firstName",
                                                            id: "first-name-input",
                                                            props: "required minlength='1' maxlength='50'"
                                                        })
                                                    ]
                                                }),
                                                
                                                // Last Name
                                                new Div({
                                                    classList: "input-section__field",
                                                    children: [
                                                        new Label({
                                                            classList: "input-title",
                                                            forElement: "last-name-input",
                                                            text: "Last Name"
                                                        }),
                                                        new Input({
                                                            classList: "input-section__input",
                                                            placeholder: "Your last name",
                                                            type: "text",
                                                            name: "lastName",
                                                            id: "last-name-input",
                                                            props: "required minlength='1' maxlength='50'"
                                                        })
                                                    ]
                                                }),
                                            ]
                                        }),
                                        
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
                                                            props: "required minlength='5'"
                                                        }),
                                                        new Button({
                                                            classList: "input-section__eye input-section__eye--show",
                                                            type: "button"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        // Password Input
                                        new Div({
                                            classList: "input-section__field",
                                            children: [
                                                new Label({
                                                    classList: "input-title",
                                                    forElement: "password-confirm-input",
                                                    text: "Confirm Password"
                                                }),
                                                new Div({
                                                    classList: "input-section__password-wrapper",
                                                    children: [
                                                        new Input({
                                                            classList: "input-section__input",
                                                            placeholder: "Confirm your password",
                                                            type: "password",
                                                            name: "passwordConfirm",
                                                            id: "password-confirm-input",
                                                            props: "required minlength='5'"
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
                                                    text: "Create account"
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
                                            text: "or sign in"
                                        })
                                    ]
                                }),
                                this.refCreateAccount = new A({
                                    classList: "log-reg-alternative__ref",
                                    href: "#/login",
                                    text: "Login"
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
    
    bindListeners() {
        // create an event and pass a function like an argument
        const eyes = document.querySelectorAll(".input-section__eye");
        eyes.forEach(eye => {
            eye.addEventListener("click", () => showPasswordToggle(eye.parentElement));
        });
        // this.btnEye.element.addEventListener("click", () => showPasswordToggle(this.passwordField.element));
        this.form.element.addEventListener("change", () => this.formValidate());
        this.form.element.addEventListener("submit", (e) => this.formSubmit(e));
        this.refCreateAccount.element.addEventListener("click", () => navigateTo(this.refCreateAccount.href));
    }
}
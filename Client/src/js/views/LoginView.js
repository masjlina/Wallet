import {Main, Div, Img, Form, Label, Input, Button, Span, P, A} from "../components/index.js";
import { View } from "../core/View.js";
import { LoginController } from "../controllers/LoginController.js";

export class LoginView extends View {
    constructor(parent) {
        super(parent, new LoginController());
    }
    
    init() {
        this.main = new Main(this.element, {
            classList: "container"
        });
        {
            this.logWrapper = new Div(this.main.getElement(), {
                classList: "log-reg-wrapper"
            });
            {
                this.logo = new Img(this.logWrapper.getElement(), {
                    classList: "logo",
                    src: "img/logo.svg",
                    alt: "Spend tracker"
                });
                
                // Sign up Form
                this.form = new Form(this.logWrapper.getElement(), {
                    classList: "input-section"
                });
                {
                    this.inputFields = new Div(this.form.getElement(), {
                        classList: "input-section__fields"
                    });
                    {
                        
                        // Email Input
                        this.emailField = new Div(this.inputFields.getElement(), {
                            classList: "input-section__field"
                        });
                        {
                            this.emailLabel = new Label(this.emailField.getElement(), {
                                classList: "input-title",
                                forElement: "email-input",
                                text: "Email Address"
                            });
                            this.emailInput = new Input(this.emailField.getElement(), {
                                classList: "input-section__input",
                                placeholder: "Your email",
                                type: "email",
                                name: "email",
                                id: "email-input",
                                props: "required"
                            });
                        }

                        // Password Input
                        this.passwordField = new Div(this.inputFields.getElement(), {
                            classList: "input-section__field"
                        });
                        {
                            this.passwordLabel = new Label(this.passwordField.getElement(), {
                                classList: "input-title",
                                forElement: "password-input",
                                text: "Password"
                            });
                            this.passwordInputWrapper = new Div(this.passwordField.getElement(), {
                                classList: "input-section__password-wrapper"
                            });
                            {
                                this.passwordInput = new Input(this.passwordInputWrapper.getElement(), {
                                    classList: "input-section__input",
                                    placeholder: "Type your password",
                                    type: "password",
                                    name: "password",
                                    id: "password-input",
                                    props: "required"   
                                });
                                this.passwordEye = new Button(this.passwordInputWrapper.getElement(), {
                                    classList: "input-section__eye input-section__eye--show",
                                    type: "button"
                                });
                            }
                        }
                    }
                    
                    // Checkbox and Submit
                    this.submitSection = new Div(this.inputFields.getElement(), {
                        classList: "log-reg"
                    });
                    {
                        this.rememberBlock = new Div(this.submitSection.getElement(), {
                            classList: "log-reg-alternative"
                        });
                        {
                            this.rememberCheckbox = new Input(this.rememberBlock.getElement(), {
                                classList: "visually-hidden remember-me__input",
                                type: "checkbox",
                                id: "remember-me-checkbox"
                            });
                            this.rememberLabel = new Label(this.rememberBlock.getElement(), {
                                classList: "remember-me__label",
                                forElement: "remember-me-checkbox",
                            });
                            {
                                this.rememberLabelText = new Span(this.rememberLabel.getElement(), {
                                    classList: "remember-me__checkbox",
                                    text: "Remember me"
                                });
                            }
                            this.submit = new Button(this.submitSection.getElement(), {
                                classList:  "log-reg__button log-reg__button--primary",
                                type: "submit"
                            })
                        }
                    }
                }

                // Other option
                this.otherOption = new Div(this.logWrapper.getElement(), {
                    classList: "log-reg-alternative"
                });
                {
                    this.alternativeOr = new Div(this.otherOption.getElement(), {
                        classList: "log-reg-alternative_or"
                    });
                    {
                        this.orRegister = new P(this.alternativeOr.getElement(), {
                            classList: "log-reg-alternative__text",
                            text: "or sign up"
                        })
                    }
                    this.createAccount = new A(this.otherOption.getElement(), {
                        classList: "log-reg-alternative__ref",
                        href: "#"
                    });
                }
            }
        }
    }
    
    // recursive mount
    // TODO: Component-container, remove parent element (gemini)
}
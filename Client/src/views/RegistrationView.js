// import {Main, Div, Img, Form, Label, Input, Button, Span, P, A, showPasswordToggle} from "../components/index.js";
// import {View} from "../core/View.js";
// import {validate, navigateTo} from "../utils/index.js";
// import {registerUser} from "../api/authenticationAdapter";
// import urlPaths from "../utils/enumeration";
//
// export class RegistrationView extends View {
//     constructor(parent) {
//         super(parent);
//
//         this.location = "/registration";
//     }
//
//     init() {
//         this.mainComponent = new Main({
//             classList: "log-reg__wrapper",
//             children: [
//                 new Div({
//                     classList: "log-reg__container",
//                     children: [
//                         new Img({
//                             classList: "logo",
//                             src: "img/logo.svg",
//                             alt: "Spend tracker"
//                         }),
//
//                         // Sign up Form
//                         this.form = new Form({
//                             classList: "input-section",
//                             action: "#",
//                             method: "post",
//                             props: "novalidate",
//                             children: [
//                                 new Div({
//                                     classList: "input-section__fields",
//                                     children: [
//                                         // Name Input
//                                         new Div({
//                                             classList: "input-section__double-field",
//                                             children: [
//
//                                                 // First Name
//                                                 new Div({
//                                                     classList: "input-section__field",
//                                                     children: [
//                                                         new Label({
//                                                             classList: "input-title",
//                                                             forElement: "first-name-input",
//                                                             text: "First Name"
//                                                         }),
//                                                         new Input({
//                                                             classList: "input-section__input",
//                                                             placeholder: "Your first name",
//                                                             type: "text",
//                                                             name: "firstName",
//                                                             id: "first-name-input",
//                                                             props: "required minlength='1' maxlength='50'"
//                                                         })
//                                                     ]
//                                                 }),
//
//                                                 // Last Name
//                                                 new Div({
//                                                     classList: "input-section__field",
//                                                     children: [
//                                                         new Label({
//                                                             classList: "input-title",
//                                                             forElement: "last-name-input",
//                                                             text: "Last Name"
//                                                         }),
//                                                         new Input({
//                                                             classList: "input-section__input",
//                                                             placeholder: "Your last name",
//                                                             type: "text",
//                                                             name: "lastName",
//                                                             id: "last-name-input",
//                                                             props: "required minlength='1' maxlength='50'"
//                                                         })
//                                                     ]
//                                                 }),
//                                             ]
//                                         }),
//
//                                         // Email Input
//                                         new Div({
//                                             classList: "input-section__field",
//                                             children: [
//                                                 new Label({
//                                                     classList: "input-title",
//                                                     forElement: "email-input",
//                                                     text: "Email Address"
//                                                 }),
//                                                 new Input({
//                                                     classList: "input-section__input",
//                                                     placeholder: "Your email",
//                                                     type: "email",
//                                                     name: "email",
//                                                     id: "email-input",
//                                                     props: "required minlength='5' maxlength='254'"
//                                                 })
//                                             ]
//                                         }),
//
//                                         // Password Input
//                                         new Div({
//                                             classList: "input-section__field",
//                                             children: [
//                                                 new Label({
//                                                     classList: "input-title",
//                                                     forElement: "password-input",
//                                                     text: "Password"
//                                                 }),
//                                                 new Div({
//                                                     classList: "input-section__password-wrapper",
//                                                     children: [
//                                                         new Input({
//                                                             classList: "input-section__input",
//                                                             placeholder: "Type your password",
//                                                             type: "password",
//                                                             name: "password",
//                                                             id: "password-input",
//                                                             props: "required minlength='5'"
//                                                         }),
//                                                         new Button({
//                                                             classList: "input-section__eye input-section__eye--show",
//                                                             type: "button",
//                                                             props: "tabindex='-1'"
//                                                         })
//                                                     ]
//                                                 })
//                                             ]
//                                         }),
//                                         // Password Input
//                                         new Div({
//                                             classList: "input-section__field",
//                                             children: [
//                                                 new Label({
//                                                     classList: "input-title",
//                                                     forElement: "password-confirm-input",
//                                                     text: "Confirm Password"
//                                                 }),
//                                                 new Div({
//                                                     classList: "input-section__password-wrapper",
//                                                     children: [
//                                                         new Input({
//                                                             classList: "input-section__input",
//                                                             placeholder: "Confirm your password",
//                                                             type: "password",
//                                                             name: "confirmPassword",
//                                                             id: "password-confirm-input",
//                                                             props: "required minlength='5'"
//                                                         }),
//                                                         new Button({
//                                                             classList: "input-section__eye input-section__eye--show",
//                                                             type: "button",
//                                                             props: "tabindex='-1'"
//                                                         })
//                                                     ]
//                                                 })
//                                             ]
//                                         }),
//
//                                         // Checkbox and Submit
//                                         new Div({
//                                             classList: "log-reg",
//                                             children: [
//                                                 new Div({
//                                                     classList: "remember-me",
//                                                     children: [
//                                                         new Input({
//                                                             classList: "visually-hidden remember-me__input",
//                                                             type: "checkbox",
//                                                             id: "remember-me-checkbox",
//                                                             name: "rememberMe"
//                                                         }),
//                                                         new Label({
//                                                             classList: "remember-me__label",
//                                                             forElement: "remember-me-checkbox",
//                                                             children: [
//                                                                 new Span({
//                                                                     classList: "remember-me__checkbox",
//                                                                 }),
//                                                                 new P({
//                                                                     text: "Remember me"
//                                                                 })
//                                                             ]
//                                                         })
//                                                     ]
//                                                 }),
//                                                 this.subButton = new Button({
//                                                     classList: "log-reg__button log-reg__button--primary",
//                                                     type: "submit",
//                                                     text: "Create account"
//                                                 })
//                                             ]
//                                         }),
//                                     ]
//                                 })
//                             ]
//                         }),
//
//                         // Another option
//                         new Div({
//                             classList: "log-reg-alternative",
//                             children: [
//                                 new Div({
//                                     classList: "log-reg-alternative__or",
//                                     children: [
//                                         new P({
//                                             classList: "log-reg-alternative__text",
//                                             text: "or sign in"
//                                         })
//                                     ]
//                                 }),
//                                 this.refLogin = new A({
//                                     classList: "log-reg-alternative__ref",
//                                     href: `${urlPaths.login}`,
//                                     text: "Login"
//                                 })
//                             ]
//                         })
//                     ]
//                 })
//             ]
//         });
//     }
//
//     async mountView() {
//         await this.mainComponent.mountComponent(this.parent);
//         this.bindListeners();
//     }
//
//     unmount() {
//         this.mainComponent.unmount();
//     }
//
//     formValidate() {
//         validate(this.form.element);
//     }
//
//     async formSubmit(e) {
//         e.preventDefault();
//         if (validate(e.target)) {
//             const formData = new FormData(e.target);
//             const response = await registerUser(Object.fromEntries(formData.entries()));
//             if (response.isRegistrationSuccessful) {
//                 navigateTo(urlPaths.login);
//             } else {
//                 console.log(...response.errors);
//             }
//         }
//     }
//
//     bindListeners() {
//         // create an event and pass a function like an argument
//         const eyes = document.querySelectorAll(".input-section__eye");
//         eyes.forEach(eye => {
//             eye.addEventListener("click", () => showPasswordToggle(eye.parentElement));
//         });
//         this.form.element.addEventListener("change", () => this.formValidate());
//         this.form.element.addEventListener("submit", (e) => this.formSubmit(e));
//         this.refLogin.element.addEventListener("click", () => navigateTo(urlPaths.login));
//     }
// }
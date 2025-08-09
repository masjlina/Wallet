"use strict;"

import { Label } from "./components/log-reg/Label.js";
import { Input } from "./components/log-reg/Input.js"
import { Button } from "./components/log-reg/Button.js"
import { PasswordField } from "./components/log-reg/PasswordField.js"

const parent = document.querySelectorAll(".input-section__field")[1];

const label = new Label(parent, {
    classList: "input-title",
    forElement: "password-input",
    text: "Password",
});

const passwordField = new PasswordField(parent);

passwordField.mount();

const input = new Input(passwordField.getElement(), {
    classList: "input-section__input",
    placeholder: "Type your password",
    type: "password",
    name: "password",
    id: "password-input"
});

const button = new Button(passwordField.getElement(), {
     classList: "input-section__eye input-section__eye--show",
     type: "button"
});

passwordField.classList = "input-section__password-wrapper"

passwordField.Input = input;
passwordField.Button = button;

passwordField.mount();

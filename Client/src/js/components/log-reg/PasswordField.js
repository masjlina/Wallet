import { Component } from "../../core/Component.js";

export default function showPasswordToggle(passwordField) {
    const input = passwordField.querySelector("input");
    const eye = passwordField.querySelector("button");

    if (eye.classList.contains("input-section__eye--show")) {
        eye.classList.replace("input-section__eye--show", "input-section__eye--hide");
        input.type = "text";
    } else {
        eye.classList.replace("input-section__eye--hide", "input-section__eye--show");
        input.type = "password"
    }
}
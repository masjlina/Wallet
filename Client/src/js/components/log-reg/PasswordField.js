import { Component } from "../../core/Component.js";

export default class PasswordField extends Component {
    constructor(parent, Input, Button, { classList, props } = {}) {
        super(parent, "div", props);

        this.classList = classList;
        this.Input = Input;
        this.Button = Button;
    }

    init() {
        return `
            <div 
                class="${this.classList}">
                ${this.Input?.init()}
                ${this.Button?.init()}
            </div>
        `
    }
}
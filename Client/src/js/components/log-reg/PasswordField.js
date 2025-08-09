import { Component } from "../../core/Component";

export class PasswordField extends Component {
    constructor(parent, Input, Button, { classList, props } = {}) {
        super(parent, "div", props);

        this.classList = classList;
        this.Input = Input;
        this.Button = Button;
    }

    render() {
        return `
            <div 
                class="${this.classList}">
                ${this.Input?.render()}
                ${this.Button?.render()}
            </div>
        `
    }
}
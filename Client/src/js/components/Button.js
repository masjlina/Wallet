import { Component } from "../../core/Component";

export class Button extends Component {
    constructor(parent, { classList, type, text, props }) {
        super(parent, "button", props);

        this.classList = classList;
        this.type = type;
        this.text = text ?? "";
    }

    render() {
        return `
            <button 
                class="${this.classList}" 
                type="${this.type}" 
                ${this.props}>
                ${this.text}
            </button>
        `
    }
}
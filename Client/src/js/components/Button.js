import { Component } from "../core/Component.js";

export default class Button extends Component {
    constructor({ children, classList, type, text, props }) {
        super(children, props);

        this.classList = classList;
        this.type = type;
        this.text = text ?? "";
    }

    init() {
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
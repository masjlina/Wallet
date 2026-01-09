import { Component } from "../core/Component.js";

export default class Span extends Component{
    constructor({children, classList, text, props}) {
        super(children, props);

        this.classList = classList ?? "";
        this.text = text ?? "";
    }
    
    init() {
        return `
            <span 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </span>
        `
    }
}
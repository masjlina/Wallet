import { Component } from "../core/Component.js";

export default class Span extends Component{
    constructor(parent, {classList, text, props}) {
        super(parent, "span", props);

        this.classList = classList;
        this.text = text;
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
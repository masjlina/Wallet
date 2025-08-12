import { Component } from "../core/Component.js";

export default class A extends Component{
    constructor({classList, children, href, text, props}) {
        super(children, props);

        this.href = href;
        this.classList = classList;
        this.text = text;
    }
    
    init() {
        return `
            <a 
                class="${this.classList}" 
                href="${this.href}"
                ${this.props}>${this.text}
            </a>
        `
    }
}
import { Component } from "../core/Component.js";

export default class P extends Component{
    constructor({children, classList, text, props}) {
        super(children, props);

        this.classList = classList ?? "";
        this.text = text;
    }
    
    init() {
        return `
            <p 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </p>
        `
    }
}
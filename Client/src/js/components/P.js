import { Component } from "../core/Component.js";

export default class P extends Component{
    constructor(parent, {classList, text, props}) {
        super(parent, "p", props);

        this.classList = classList;
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
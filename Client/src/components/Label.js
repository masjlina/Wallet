import { Component } from "../core/Component.js";

export default class Label extends Component{
    constructor({children, classList, forElement, text, props}) {
        super(children, props);

        this.classList = classList;
        this.forElement = forElement;
        this.text = text ?? "";
    }
    
    init() {
        return `
            <label 
                class="${this.classList}" 
                for="${this.forElement}" ${this.props}>${this.text}
            </label>
        `
    }
}
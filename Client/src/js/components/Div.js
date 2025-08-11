import { Component } from "../core/Component.js";

export default class Div extends Component{
    constructor(parent, {classList, text, props}) {
        super(parent, "div", props);

        this.classList = classList;
        this.text = text;
    }
    
    init() {
        return `
            <div 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </div>
        `
    }
}
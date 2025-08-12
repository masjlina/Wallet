import { Component } from "../core/Component.js";

export default class Div extends Component{
    constructor({children, classList, text = "", props}) {
        super(children, props);

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
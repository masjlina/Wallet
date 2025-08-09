import { Component } from "../../core/Component";

export class Span extends Component{
    constructor(parent, {classList, text, props}) {
        super(parent, "span", props);

        this.classList = classList;
        this.text = text;
    }
    
    render() {
        return `
            <span 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </span>
        `
    }
}
import { Component } from "../../core/Component";

export class Div extends Component{
    constructor(parent, {classList, text, props}) {
        super(parent, "div", props);

        this.classList = classList;
        this.text = text;
    }
    
    render() {
        return `
            <div 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </div>
        `
    }
}
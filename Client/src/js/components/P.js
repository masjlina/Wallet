import { Component } from "../../core/Component";

export class P extends Component{
    constructor(parent, {classList, text, props}) {
        super(parent, "p", props);

        this.classList = classList;
        this.text = text;
    }
    
    render() {
        return `
            <p 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </p>
        `
    }
}
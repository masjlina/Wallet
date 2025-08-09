import { Component } from "../../core/Component";

export class A extends Component{
    constructor(parent, {classList, href, text, props}) {
        super(parent, "a", props);

        this.href = href;
        this.classList = classList;
        this.text = text;
    }
    
    render() {
        return `
            <a 
                class="${this.classList}" 
                href="${this.href}"
                ${this.props}>${this.text}
            </a>
        `
    }
}
import { Component } from "../../core/Component";

export class Img extends Component{
    constructor(parent, {classList, src, alt, props}) {
        super(parent, "img", props);

        this.classList = classList;
        this.src = src;
        this.alt = alt;
    }
    
    render() {
        return `
            <img 
                class="${this.classList}" 
                src="${this.src}" 
                alt="${this.alt}" 
                ${this.props}>
        `
    }
}
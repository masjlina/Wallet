import { Component } from "../core/Component.js";

export default class Img extends Component{
    constructor({children, classList, src, alt, props}) {
        super(children, props);

        this.classList = classList || "";
        this.src = src;
        this.alt = alt;
    }
    
    init() {
        return `
            <img 
                class="${this.classList}" 
                src="${this.src}" 
                alt="${this.alt}" 
                ${this.props}>
        `
    }
}
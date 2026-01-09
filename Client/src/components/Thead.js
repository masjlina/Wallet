import { Component } from "../core/Component.js";

export default class Thead extends Component{
    constructor({children, classList, text = "", props}) {
        super(children, props);

        this.classList = classList || "";
        this.text = text;
    }
    
    init() {
        return `
            <thead 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </thead>
        `
    }
}
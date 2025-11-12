import { Component } from "../core/Component.js";

export default class Tbody extends Component{
    constructor({children, classList, text = "", props}) {
        super(children, props);

        this.classList = classList || "";
        this.text = text;
    }
    
    init() {
        return `
            <tbody 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </tbody>
        `
    }
}
import { Component } from "../core/Component.js";

export default class Tr extends Component{
    constructor({children, classList, text = "", props}) {
        super(children, props);

        this.classList = classList || "";
        this.text = text;
    }
    
    init() {
        return `
            <tr 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </tr>
        `
    }
}
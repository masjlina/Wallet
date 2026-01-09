import { Component } from "../core/Component.js";

export default class Td extends Component{
    constructor({children, classList, text = "", props}) {
        super(children, props);

        this.classList = classList || "";
        this.text = text;
    }
    
    init() {
        return `
            <td 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </td>
        `
    }
}
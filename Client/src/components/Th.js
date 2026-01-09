import { Component } from "../core/Component.js";

export default class Th extends Component{
    constructor({children, classList, text = "", props}) {
        super(children, props);

        this.classList = classList || "";
        this.text = text;
    }
    
    init() {
        return `
            <th 
                class="${this.classList}" 
                ${this.props}>${this.text}
            </th>
        `
    }
}
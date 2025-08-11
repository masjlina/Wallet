import { Component } from "../core/Component.js";

export default class Form extends Component{
    constructor(parent, {classList, action, method, props}) {
        super(parent, "form", props);

        this.classList = classList;
        this.action = action;
        this.method = method;
    }
    
    init() {
        return `
            <form 
                class="${this.classList}" 
                action="${this.action}" 
                method="${this.method}" 
                ${this.props}>
            </form>
        `
    }
}
import { Component } from "../core/Component.js";

export default class Form extends Component{
    constructor({children, classList, action, method, props}) {
        super(children, props);

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
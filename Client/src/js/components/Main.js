import { Component } from "../../core/Component";

export class Main extends Component{
    constructor(parent, {classList, props}) {
        super(parent, "main", props);

        this.classList = classList;
    }
    
    render() {
        return `
            <span 
                class="${this.classList}" 
                ${this.props}>
            </span>
        `
    }
}
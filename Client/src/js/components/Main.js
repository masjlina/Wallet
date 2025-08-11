import { Component } from "../core/Component.js";

export default class Main extends Component{
    constructor(parent, {classList, props}) {
        super(parent, "main", props);

        this.classList = classList;
    }
    
    init() {
        return `
            <main 
                class="${this.classList}" 
                ${this.props}>
            </main>
        `
    }
}
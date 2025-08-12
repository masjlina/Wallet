import { Component } from "../core/Component.js";

export default class Main extends Component{
    constructor({children, classList, props = ""}) {
        super(children, props);
        
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
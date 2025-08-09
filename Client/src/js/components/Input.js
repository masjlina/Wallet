import { Component } from "../../core/Component";

export class Input extends Component {
    constructor(parent, { classList, placeholder, type, name, id, props }) {
        ;
        super(parent, "input", props);

        this.classList = classList;
        this.placeholder = placeholder;
        this.type = type;
        this.name = name;
        this.id = id;
    }

    render() {
        return `
            <input 
                class="${this.classList}" 
                placeholder="${this.placeholder}" 
                type="${this.type}" 
                name="${this.name}"
                id="${this.id}"
                ${this.props} />
        `
    }
}
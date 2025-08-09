"use strict;"

export class Component {
    constructor(parent, elementName, props = "") {
        this.parent = parent;
        this.elementName = elementName;
        this.props = props;
        this.element = null;
    }

    render() {
        throw new Error("Render method should be implemented in child class");
    }

    getElement() {
        return this.element;
    }

    mount() {
        if (this.element && this.element.parentNode) {
            this.umount();
        }

        const html = this.render();
        const tempDiv = document.createElement(this.elementName);
        tempDiv.innerHTML = html.trim();
        this.element = tempDiv.firstChild;

        this.parent.appendChild(this.element);
    }

    umount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    addEventListener() {

    }
}
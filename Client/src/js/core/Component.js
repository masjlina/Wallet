"use strict;"

import { Element } from './Element';

export class Component extends Element {
    constructor(parent, elementTitle, props = "") {
        super(parent)
        this.elementTitle = elementTitle;
        this.props = props;
    }

    init() {
        super.init();
    }

    getElement() {
        return this.element;
    }

    mount() {
        if (this.element && this.element.parentNode) {
            return;
        }

        const html = this.init();
        const tempDiv = document.createElement(this.elementTitle);
        tempDiv.innerHTML = html.trim();
        this.element = tempDiv.firstChild;

        this.parent.appendChild(this.element);
    }

    umount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
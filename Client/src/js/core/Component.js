"use strict;"

import {Element} from './Element';

export class Component extends Element {
    constructor(children, props = "") {
        super();

        this.children = children || [];
        this.props = props;
    }

    init() {
        super.init();
    }

    mount(parent) {
        if (this.element && this.element.parentNode) {
            return;
        }

        const html = this.init();
        // Temporary container
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html.trim();
        this.element = tempDiv.firstElementChild;

        if (parent) {
            parent.appendChild(this.element);
            this.recursiveMount(this.children);
        }
    }

    recursiveMount(children) {
        if (children && children.length > 0) {
            children.forEach(child => {
                child.mount(this.element);
            });
        }
    }

    unmout() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
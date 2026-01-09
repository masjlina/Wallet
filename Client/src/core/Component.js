"use strict";

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

    mountComponent(parent) {
        if (this.element && this.element.parentNode) {
            return;
        }

        const html = this.init();
        // Temporary container
        const tpl = document.createElement("template");
        tpl.innerHTML = html.trim();
        this.element = tpl.content.firstElementChild;

        if (parent) {
            if (!(this.element instanceof Node)) {
                console.error("Not a Node:", this);
                return;
            }

            parent.appendChild(this.element);
            this.recursiveMount(this.children);
        }
    }

    recursiveMount(children) {
        if (children && children.length > 0) {
            children.forEach(child => {
                child.mountComponent(this.element);
            });
        }
    }
}
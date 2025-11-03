"use strict;"

export class Element {
    constructor() {
        this.element = null;
    }

    init() {
        throw new Error("init method should be implemented in child class");
    }

    mountElement() {

    }

    unmount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
"use strict;"

export class Element {
    constructor() {
        this.element = null;
    }

    init() {
        throw new Error("init method should be implemented in child class");
    }

    mount() {

    }

    unmout() {

    }
}
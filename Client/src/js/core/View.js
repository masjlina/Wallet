"use strict;"

import { Element } from "./Element.js"

export class View extends Element {
    constructor(parent) {
        super();
        this.parent = parent;

        this.init();
    }

    init() {

    }

    async mount() {
    }

    bindListeners() {

    }
}
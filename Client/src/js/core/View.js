"use strict;"

import { Element } from "./Element.js"

export class View extends Element {
    constructor(controller = {}, parent) {
        super();
        this.controller = controller;
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
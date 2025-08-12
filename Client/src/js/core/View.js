"use strict;"

import { Element } from "./Element.js"

export class View extends Element {
    constructor(controller = {}) {
        super();
        this.controller = controller;

        this.init();
    }

    init() {

    }

    bindListeners() {

    }
}
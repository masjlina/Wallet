"use strict;"

import { Element } from "./Element.js"

export class View extends Element {
    constructor(parent, controller = {}) {
        super(parent);
        this.controller = controller;

        this.bindListeners();
    }

    init() {

    }

    bindListeners() {

    }
}
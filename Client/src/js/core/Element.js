"use strict;"

export class Element {
    constructor(parent) {
        this.parent = parent;
        this.element = null;
    }

    init() {
        throw new Error("init method should be implemented in child class");
    }

    mount() {
;
    }

    umount() {

    }
}
import {userEvent, within} from "storybook/test";

export default class BasePo {
    constructor(scope, event) {
        const container = scope?.canvasElement ?? scope;

        this.scope = typeof container.getByRole === "function"
            ? container
            : within(container);
        this.event = typeof event?.type === "function" ? event : userEvent;
    }
}

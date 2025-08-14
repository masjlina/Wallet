import {showErrors, showDefault} from "./index.js";

export default function validate(form) {
    const inputs = form.querySelectorAll("input");

    const errorInputs = Array.from(inputs).filter(input => {
            if (!input.checkValidity()) {
                return input;
            } else {
                showDefault(input);
            }
        }
    );

    showErrors(errorInputs);
}
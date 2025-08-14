const errorStyle = "input-section__input--error";

export function showErrors(inputs) {
    if (!inputs || inputs.length === 0) return;
    
    inputs.forEach(input => {
        input.classList.add(errorStyle);
    });
}

export function showDefault(input) {
    input.classList.remove(errorStyle);
}
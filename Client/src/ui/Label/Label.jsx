// Styles
import "./label.scss";

const Label = ({id, labelText, className = "label"}) => {
    return (
        <label
            htmlFor={id}
            className={className}
        >
            {labelText}
        </label>
    );
}

export default Label;
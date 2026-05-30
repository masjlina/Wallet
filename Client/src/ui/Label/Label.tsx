// Styles
import "./label.scss";
import type {LabelHTMLAttributes, ReactNode} from "react";

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
    labelText: string
}

const Label = ({
                   id,
                   labelText,
                   className = "label"
               }: IProps): ReactNode => {
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
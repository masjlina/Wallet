// Styles
import "./textarea.scss";
import type {ReactNode, TextareaHTMLAttributes} from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const Textarea = ({
                      className = "",
                      ...rest
                  }: IProps): ReactNode => {
    return (
        <textarea
               className={`textarea input ${className}`}
               {...rest}
        />
    )
}

export default Textarea;
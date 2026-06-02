// Styles
import "./input.scss";
import type {InputHTMLAttributes, ReactNode} from "react";

export type IInputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({
                   type = "text",
                   className = "",
                   ...rest
               }: IInputProps): ReactNode => {
    return (
        <input
               type={type}
               className={`input ${className}`}
               {...rest}
        />
    )
}

export default Input;
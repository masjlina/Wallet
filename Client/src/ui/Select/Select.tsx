// Styles
import "./select.scss";
import type {ReactNode, SelectHTMLAttributes} from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
}

const Select = ({
                    className = "",
                    children,
                    ...rest
                }: IProps): ReactNode => {
    return (
        <select
               className={`input select ${className}`}
               {...rest}
        >
            {children}
        </select>
    )
}

export default Select;
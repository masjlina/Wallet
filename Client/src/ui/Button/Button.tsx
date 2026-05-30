// Styles
import "./button.scss";
import type {ButtonHTMLAttributes, ReactNode} from "react";

const VARIANT_CLASS = {
    primary: "btn--primary",
} as const;

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof VARIANT_CLASS,
}

const Button = ({
                    children,
                    variant = "primary",
                    className = "",
                    type = "button",
                    ...restProps
                }: IButtonProps): ReactNode => {
    const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary;

    return (
        <button
            className={`btn ${variantClass} ${className}`.trim()}
            type={type}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;

import "./button.scss";

const VARIANT_CLASS = {
    primary: "btn--primary",
};

const Button = ({ children, variant = "primary", className = "", type = "button", ...restProps }) => {
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

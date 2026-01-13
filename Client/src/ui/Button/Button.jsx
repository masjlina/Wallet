import "./button.scss";

const VARIANT_CLASS = {
    primary: "btn--primary"
}

const Button = ({children, variant = VARIANT_CLASS.primary, className, ...restProps}) => {
    return (
        <button
            className={`btn ${variant} ${className}`}
            type="submit"
            {...restProps}
        >{children}</button>
    )
}

export default Button;
import "./button.scss";

const VARIANT_CLASS = {
    primary: "btn--primary"
}

const Button = ({text, variant = VARIANT_CLASS.primary, className}) => {
    return (
        <button className={`btn ${VARIANT_CLASS[variant]} ${className}`} type="submit">{text}</button>
    )
}

export default Button;
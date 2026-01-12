import "./input.scss";

const Input = ({id, variant, type = "text", name, value, placeholder, className = "input", ...rest}) => {
    return (
        <input id={id}
               type={type}
               name={name}
               value={value}
               placeholder={placeholder}
               className={className}
               {...rest}
        />
    )
}

export default Input;
import "./input.scss";

const Input = ({id, type = "text", name, value, placeholder, className = "", ...rest}) => {
    return (
        <input id={id}
               type={type}
               name={name}
               value={value}
               placeholder={placeholder}
               className={`input ${className}`}
               {...rest}
        />
    )
}

export default Input;
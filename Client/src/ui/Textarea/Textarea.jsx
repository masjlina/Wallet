// Styles
import "./textarea.scss";

const Textarea = ({id, name, value, placeholder, className, ...rest}) => {
    return (
        <textarea id={id}
               name={name}
               value={value}
               placeholder={placeholder}
               className={`textarea input ${className}`}
               {...rest}
        />
    )
}

export default Textarea;
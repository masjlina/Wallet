import "./select.scss";

const Select = ({id, name, value, className, children, ...rest}) => {
    return (
        <select id={id}
               name={name}
               value={value}
               className={`input select ${className}`}
               {...rest}
        >
            {children}
        </select>
    )
}

export default Select;
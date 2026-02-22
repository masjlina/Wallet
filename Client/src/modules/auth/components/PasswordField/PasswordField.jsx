// Shared
import InputWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";

const PasswordField = (props) => {
    const id = props.id || "password-input";
    const inputPlaceholder = props.placeholder || "Type your password";
    const name = props.name || "password";
    return (
        <>
            <InputWithLabel
                id={id}
                variant="password"
                labelText={props.labelText ? "" : "Password"}

                placeholder={inputPlaceholder}
                autoComplete="password"
                type="password"
                name={name}
                required
                minLength="5"
                {...props} />
        </>
    )
}

export default PasswordField;
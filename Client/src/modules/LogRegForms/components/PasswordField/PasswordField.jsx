import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel";

const PasswordField = (props) => {
    const id = props.id || "password-input";
    const inputPlaceholder = props.placeholder || "Type your password";
    const name = props.name || "password";
    return (
        <>
            <InputWithLabel
                id="password-input"
                variant="password"
                labelText={props.labelText ? "" : "Password"}

                placeholder={inputPlaceholder}
                type="password"
                name="password"
                required
                minLength="5"
                {...props} />
        </>
    )
}

export default PasswordField;
import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel";

const PasswordField = (props) => {
    return (
        <>
            <InputWithLabel id="password-input" variant="password" labelText={props.labelText ? "" : "Password"} {...props} />
        </>
    )
}

export default PasswordField;
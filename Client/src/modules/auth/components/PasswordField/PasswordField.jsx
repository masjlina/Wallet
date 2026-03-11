import InputWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";

const PasswordField = ({
                           id = "password-input",
                           placeholder = "Type your password",
                           name = "password",
                           labelText,
                           ...rest
                       }) => {
    return (
        <InputWithLabel
            id={id}
            variant="password"
            labelText={labelText || "Password"}
            placeholder={placeholder}
            autoComplete="password"
            type="password"
            name={name}
            required
            minLength="5"
            {...rest}
        />
    );
};

export default PasswordField;
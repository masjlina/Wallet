import InputWithLabel, {type IFieldWithLabelProps} from "@/shared/components/FieldWithLabel/FieldWithLabel";

interface IProps extends Omit<IFieldWithLabelProps, "id" | "labelText" | "type" | "autoComplete" | "required" | "minLength" | "maxLength"> {
    id?: string;
    labelText?: string;
    placeholder?: string
}

const PasswordField = ({
                           id = "password-input",
                           placeholder = "Type your password",
                           name = "password",
                           labelText,
                           ...rest
                       }: IProps) => {
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
            minLength={5}
            {...rest}
        />
    );
};

export default PasswordField;
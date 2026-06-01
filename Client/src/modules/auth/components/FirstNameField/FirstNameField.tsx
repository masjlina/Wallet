// Shared
import InputWithLabel, {type IFieldWithLabelProps} from "@/shared/components/FieldWithLabel/FieldWithLabel";

interface IFirstNameFieldProps extends Omit<IFieldWithLabelProps, "id" | "labelText" | "type" | "name" | "required" | "minLength" | "maxLength"> {
    placeholder?: string;
}

const FirstNameField = ({
                            placeholder,
                            ...restProps
                        }: IFirstNameFieldProps) => {
    return (
        <InputWithLabel
            {...restProps}
            id="first-name-input"
            labelText="First Name"

            type="text"
            name="firstName"
            placeholder={placeholder || "Your first name"}
            required
            minLength={1}
            maxLength={50}
        />
    );
}

export default FirstNameField;
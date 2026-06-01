// Shared
import InputWithLabel, {type IFieldWithLabelProps} from "@/shared/components/FieldWithLabel/FieldWithLabel";

interface ILastNameFieldProps extends Omit<IFieldWithLabelProps, "id" | "labelText" | "type" | "name" | "required" | "minLength" | "maxLength"> {
    placeholder?: string; // Теперь опционально, фоллбек имеет смысл!
}

const LastNameField = ({
                           placeholder,
                           ...restProps
                       }: ILastNameFieldProps) => {
    return (
        <InputWithLabel
            {...restProps}
            id="last-name-input"
            labelText="Last Name"

            type="text"
            name="lastName"
            placeholder={placeholder || "Your last name"}
            required
            minLength={1}
            maxLength={50}
        />
    );
}

export default LastNameField;
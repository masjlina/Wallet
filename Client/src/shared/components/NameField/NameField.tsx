// Shared
import InputWithLabel, {type IFieldWithLabelProps} from "@/shared/components/FieldWithLabel/FieldWithLabel";
import type {ReactNode} from "react";

type IProps = IFieldWithLabelProps

const NameField = ({
                       placeholder,
                       ...restProps
                   }: IProps): ReactNode => {
    const inputPlaceholder = placeholder || "Write name";
    return (
        <>
            <InputWithLabel
                {...restProps}
                id="name-input"
                labelText="Name"

                type="text"
                name="name"
                placeholder={inputPlaceholder}
                required
                minLength={1}
                maxLength={50}
            />
        </>
    )
}

export default NameField;
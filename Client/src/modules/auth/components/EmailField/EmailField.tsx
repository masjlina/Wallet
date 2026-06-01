// Shared
import InputWithLabel, {type IFieldWithLabelProps} from "@/shared/components/FieldWithLabel/FieldWithLabel";

type PropsType = Omit<IFieldWithLabelProps, "id" | "labelText" | "type" | "name" | "autoComplete" | "required" | "minLength" | "maxLength">;

interface IProps extends PropsType {
    placeholder?: string
}

const EmailField = ({
                        placeholder,
                        ...restProps
                    }: IProps) => {
    return (
        <>
            <InputWithLabel
                {...restProps}
                id="email-input"
                labelText="Email Address"

                type="email"
                name="email"
                autoComplete="email"
                placeholder={placeholder || "Your email"}
                required
                minLength={5}
                maxLength={254}
            />
        </>
    )
}

export default EmailField;
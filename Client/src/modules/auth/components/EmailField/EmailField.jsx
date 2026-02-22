// Shared
import InputWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";

const EmailField = (props) => {
    const inputPlaceholder = props.placeholder || "Your email";
    return (
        <>
            <InputWithLabel
                id="email-input"
                labelText="Email Address"

                type="email"
                name="email"
                autoComplete="email"
                placeholder={inputPlaceholder}
                required
                minLength="5"
                maxLength="254"
                {...props} />
        </>
    )
}

export default EmailField;
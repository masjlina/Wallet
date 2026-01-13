import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel";

const EmailField = (props) => {
    const inputPlaceholder = props.placeholder || "Your email";
    return (
        <>
            <InputWithLabel
                id="email-input"
                labelText="Email Address"

                type="email"
                name="email"
                placeholder={inputPlaceholder}
                required
                minLength="5"
                maxLength="254"
                {...props} />
        </>
    )
}

export default EmailField;
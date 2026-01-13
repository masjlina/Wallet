import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel";

const FirstNameField = (props) => {
    const inputPlaceholder = props.placeholder || "Your first name";
    return (
        <>
            <InputWithLabel
                id="first-name-input"
                labelText="First Name"

                type="text"
                name="firstName"
                placeholder={inputPlaceholder}
                required
                minLength="1"
                maxLength="50"
                {...props} />
        </>
    )
}

export default FirstNameField;
import InputWithLabel from "../../../../components/FieldWithLabel/FieldWithLabel";

const LastNameField = (props) => {
    const inputPlaceholder = props.placeholder || "Your last name";
    return (
        <>
            <InputWithLabel
                id="last-name-input"
                labelText="Last Name"

                type="text"
                name="lastName"
                placeholder={inputPlaceholder}
                required
                minLength="1"
                maxLength="50"
                {...props} />
        </>
    )
}

export default LastNameField;
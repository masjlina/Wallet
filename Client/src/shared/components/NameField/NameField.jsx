// Shared
import InputWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";

const NameField = (props) => {
    const inputPlaceholder = props.placeholder || "Write name";
    return (
        <>
            <InputWithLabel
                id="name-input"
                labelText="Name"

                type="text"
                name="name"
                placeholder={inputPlaceholder}
                required
                minLength="1"
                maxLength="50"
                {...props} />
        </>
    )
}

export default NameField;
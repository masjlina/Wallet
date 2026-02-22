// App (modules)
import {formatCardNumber} from "@/modules/wallet-accounts";

// Shared
import FieldWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";

const CardField = ({ value, onChange, placeholder = "1234 5678 9012 3456", ...props }) => {

    const handleChange = (e) => {
        const raw = e.target.value;
        const formatted = formatCardNumber(raw);

        onChange(formatted.replace(/\s/g, ""));
    };

    return (
        <FieldWithLabel
            {...props}
            id="card-number"
            labelText="Card number"
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            value={formatCardNumber(value)}
            onChange={handleChange}
            required
            maxLength={23}
        />
    );
};

export default CardField;

// App (modules)
import {formatCardNumber} from "@/modules/wallet-accounts";

// Shared
import FieldWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";
import type {ChangeEvent} from "react";

interface IProps {
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
}

const CardField = ({
                       value,
                       onChange,
                       placeholder = "1234 5678 9012 3456",
                       ...restProps
                   }: IProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const formatted = formatCardNumber(raw);

        onChange(formatted.replace(/\s/g, ""));
    };

    return (
        <FieldWithLabel
            {...restProps}
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

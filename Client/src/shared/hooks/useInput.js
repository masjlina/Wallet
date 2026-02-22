// React
import { useState } from "react";

const useInput = (initial = "") => {
    const [value, setValue] = useState(initial);

    const onChange = (e) => {
        const { type, checked, value } = e.target;
        setValue(type === "checkbox" ? checked : value);
    };

    return { value, setValue, onChange };
};

export default useInput;
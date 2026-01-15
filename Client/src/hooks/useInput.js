import {useState} from "react";

const useInput = (initial = "") => {
    const [value, setValue] = useState(initial);

    const onChange = (e) => setValue(e.target.value);

    return {value, setValue, onChange}
}

export default useInput;
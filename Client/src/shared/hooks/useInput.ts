import {type ChangeEvent, type Dispatch, type SetStateAction, useState} from "react";

type AllowedInputTypes = boolean | number | string;
type EventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

interface IReturn<T> {
    value: T,
    setValue: Dispatch<SetStateAction<T>>,
    onChange: (e: EventType) => void;
}

const useInput = <T extends AllowedInputTypes = string>(initial: T = "" as unknown as T): IReturn<T> => {
    const [value, setValue] = useState<T>(initial);

    const onChange = (e: EventType): void => {
        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox")
            setValue(e.target.checked as unknown as T);
        else
            setValue(e.target.value as unknown as T);
    };

    return { value, setValue, onChange };
};

export default useInput;
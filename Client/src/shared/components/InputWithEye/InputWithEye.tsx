// React
import {type ReactNode, useState} from "react";

// UI
import Input, {type IInputProps} from "@/ui/Input/Input";

// Styles
import "./inputWithEye.scss";

const InputWithEye = ({...restProps}: IInputProps): ReactNode => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="input-with-eye">
            <Input {...restProps} type={isPasswordVisible ? "text" : "password"}/>
            <button
                className={`input__icon ${isPasswordVisible ? "input__icon--show" : "input__icon--hide"}`}
                type="button"
                tabIndex={-1}
                onClick={() => setIsPasswordVisible((v) => !v)}
            />
        </div>
    );
};

export default InputWithEye;

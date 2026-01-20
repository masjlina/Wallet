import { useState } from "react";

import Input from "../../ui/Input/Input";

import "./inputWithEye.scss";

const InputWithEye = (props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="input-with-eye">
            <Input {...props} type={isPasswordVisible ? "text" : "password"} />
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

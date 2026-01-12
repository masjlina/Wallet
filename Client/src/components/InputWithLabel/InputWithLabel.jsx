import Input from "../../ui/Input/Input";

import "./inputWithLabel.scss";
import Label from "../../ui/Label/Label";
import InputWithEye from "../InputWithEye/InputWithEye";

const InputWithLabel = ({id, variant = "default", labelText, ...inputProps}) => {
    return (
        <div className="input-section__field">
            <Label
                id={id}
                labelText={labelText}
            >
            </Label>
            {variant === "password" ?
                <InputWithEye id={id} {...inputProps}/> :
                <Input id={id} {...inputProps}/>}
        </div>
    );
}

export default InputWithLabel;
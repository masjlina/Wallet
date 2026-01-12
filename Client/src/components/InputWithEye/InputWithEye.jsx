import Input from "../../ui/Input/Input";

import "./inputWithEye.scss";

const InputWithEye = (props) => {
  return (
      <div className="input-with-eye">
          <Input {...props}/>
          <button className="input__icon input-section__icon--show" type="button"/>
      </div>
  )
}

export default InputWithEye;
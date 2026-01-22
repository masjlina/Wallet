import plusIcon from "../../../../../../assets/icons/plus.svg";
import React from "react";

import "./buttonCreateEntity.scss";
import Button from "../../../../../../ui/Button/Button";

const ButtonCreateEntity = ({ onClick, text = "Create" }) => {
    return (
        <Button
            className="btn__add text text__base--bold text__base--white"
            variant="primary"
            onClick={onClick}
        >
            <img className="btn__add-icon" src={plusIcon} alt="" />
            <span>{text}</span>
        </Button>
    );
};


export default ButtonCreateEntity;
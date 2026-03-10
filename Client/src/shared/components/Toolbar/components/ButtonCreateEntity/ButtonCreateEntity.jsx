// React
import React from "react";

// UI
import Button from "@/ui/Button/Button";

// Local
import plusIcon from "@/assets/icons/plus.svg";

// Styles
import "./buttonCreateEntity.scss";

const ButtonCreateEntity = ({ onClick, text = "Create", className }) => {
    return (
        <Button
            className={`btn__add text text__base--bold text__base--white ${className}`}
            variant="primary"
            onClick={onClick}
        >
            <img className="btn__add-icon" src={plusIcon} alt="" />
            <span>{text}</span>
        </Button>
    );
};


export default ButtonCreateEntity;

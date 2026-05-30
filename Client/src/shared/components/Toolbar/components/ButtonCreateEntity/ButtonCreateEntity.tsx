// React
import {type ReactNode} from "react";

// UI
import Button, {type IButtonProps} from "@/ui/Button/Button";

// Local
import plusIcon from "@/assets/icons/plus.svg";

// Styles
import "./buttonCreateEntity.scss";

interface IProps extends IButtonProps {
    text: string
}

const ButtonCreateEntity = ({
                                onClick,
                                text = "Create",
                                className = ""
                            }: IProps): ReactNode => {
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

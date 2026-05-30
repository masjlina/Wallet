// Local
import logoIcon from "@/assets/img/logo.svg";

// Styles
import "./logo.scss";
import type {ImgHTMLAttributes, ReactNode} from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
}

const Logo = ({className}: IProps): ReactNode => {
    return (
        <img src={logoIcon} className={className || ""} alt="Spend Tracker"/>
    );
}

export default Logo;
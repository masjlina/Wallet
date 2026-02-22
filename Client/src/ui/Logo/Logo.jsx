// Local
import logoIcon from "@/assets/img/logo.svg";

// Styles
import "./logo.scss";

const Logo = ({className}) => {
    return (
        <img src={logoIcon} className={className || ""} alt="Spend Tracker"/>
    );
}

export default Logo;
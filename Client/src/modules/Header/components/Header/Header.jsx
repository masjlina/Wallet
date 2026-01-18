import Logo from "../../../../ui/Logo/Logo";

import bellIcon from "../../../../assets/icons/bell.svg";
import profileIcon from "../../../../assets/img/profile.png";

import "./header.scss";

const Header = () => {
    return (
        <div className="wrapper header__wrapper">
            <div className="container header__container">
                <Logo className="logo--header"/>
                <div className="content header__content">
                    <img className="icon" src={bellIcon} alt="bell"/>
                    <img className="icon--profile" src={profileIcon} alt="profile"/>
                </div>
            </div>
        </div>
    );
}

export default Header;
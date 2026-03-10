import { useSelector } from "react-redux";

import Logo from "@/ui/Logo/Logo";

import bellIcon from "@/assets/icons/bell.svg";
import profileIcon from "@/assets/img/profile.svg";

import { serverUrl } from "@/shared/consts/endpoints";

import "./header.scss";

const Header = () => {

    const avatarUri = useSelector(state => state.user?.user?.avatarUri);

    const avatarSrc =
        (avatarUri ? `${serverUrl}${avatarUri}?t=${Date.now()}` : profileIcon);

    return (
        <div className="wrapper header__wrapper">
            <div className="container header__container">
                <Logo className="logo--header"/>
                <div className="content header__content">
                    <img className="icon" src={bellIcon} alt="bell"/>
                    <img className="icon--profile" src={avatarSrc} alt="profile"/>
                </div>
            </div>
        </div>
    );
}

export default Header;
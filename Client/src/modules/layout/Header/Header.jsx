import {useDispatch, useSelector} from "react-redux";

import Logo from "@/ui/Logo/Logo";

import bellIcon from "@/assets/icons/bell.svg";
import profileIcon from "@/assets/img/profile.svg";

import {serverUrl} from "@/shared/consts/endpoints";

import "./header.scss";
import useModal from "@/shared/hooks/useModal";
import React from "react";
import ProfileModal from "@/modules/layout/Header/components/ProfileModal/ProfileModal";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/shared/consts/routes";
import {logoutUser} from "@/modules/auth/store/authThunks";

const Header = () => {
    const contextModal = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const avatarUri = useSelector(state => state.user?.user?.avatarUri);

    const avatarSrc =
        (avatarUri ? `${serverUrl}${avatarUri}?t=${Date.now()}` : profileIcon);

    const onLogout = () => {
        dispatch(logoutUser());
        navigate(ROUTES.LOGIN);
    }

    return (
        <div className="wrapper header__wrapper">
            <div className="container header__container">
                <Logo className="logo--header"/>
                <div className="content header__content">
                    {/*<img className="icon" src={bellIcon} alt="bell"/>*/}
                    <img
                        className="icon--profile"
                        src={avatarSrc}
                        onClick={contextModal.openModal}
                        alt="profile"/>
                </div>
            </div>

            <ProfileModal
                isOpen={contextModal.isOpen}
                anchorEl={contextModal.anchorEl}
                onClose={contextModal.closeModal}
                onNavigateSettings={() => navigate(ROUTES.SETTINGS)}
                onLogout={onLogout}
            />
        </div>
    );
}

export default Header;
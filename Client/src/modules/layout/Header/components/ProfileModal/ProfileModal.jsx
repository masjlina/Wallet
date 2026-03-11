import React, {useLayoutEffect, useRef, useState} from "react";
import Modal from "@/shared/components/Modal/Modal";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import settingsIcon from "@/assets/icons/gear.svg";
import logoutIcon from "@/assets/icons/out-door.svg";

import "./profileModal.scss";

const ProfileModal = ({isOpen, anchorEl, onClose, onNavigateSettings, onLogout}) => {
    const boxRef = useRef(null);
    const [pos, setPos] = useState({top: 0, left: 0});

    useLayoutEffect(() => {
        if (!isOpen || !anchorEl || !boxRef.current) return;

        const rect = anchorEl.getBoundingClientRect();
        const modalRect = boxRef.current.getBoundingClientRect();

        setPos({
            top: rect.bottom + 10,
            left: rect.right - modalRect.width,
        });
    }, [isOpen, anchorEl]);

    return (
        <Modal
            variant={MODAL_VARIANT.CONTEXT}
            isOpen={isOpen}
            onClose={onClose}
            boxRef={boxRef}
            pos={pos}
            className="profile-modal"
        >
            <Modal.Content className="text--base">
                <button
                    className="btn btn__nav btn__modal"
                    type="button"
                    onClick={() => {
                        onNavigateSettings()
                        onClose();
                    }}>
                    <img src={settingsIcon} alt="Edit"/>
                    Settings
                </button>

                <hr/>

                <button
                    className="btn btn__nav btn__modal"
                    type="button"
                    onClick={() => {
                        onLogout();
                        onClose();
                    }}>
                    <img
                        src={logoutIcon}
                        alt="Logout"/>
                    Logout
                </button>
            </Modal.Content>
        </Modal>
    );
};

export default ProfileModal;

import {createPortal} from "react-dom";

import "./modal.scss";
import MODAL_VARIANT from "../../../consts/modalVariants";

const Modal = ({variant, isOpen, onClose, boxRef, pos, children}) => {
    if (!isOpen) return null;
    let contextStyle = {};
    let modalPositionClass = "";
    let modalAlignClass = "";

    switch (variant) {
        case MODAL_VARIANT.CONTEXT: {
            contextStyle = {
                position: "fixed",
                top: pos.top,
                left: pos.left,
            };
            break;
        }
        case MODAL_VARIANT.CENTRAL: {
            modalPositionClass = "d-center bg-inactive";
            modalAlignClass = "d-col";
            break;
        }
    }

    return createPortal(
        <div className={`modal__underlay ${modalPositionClass}`} onClick={onClose}>
            <div
                className=" modal__wrapper"
                ref={boxRef}
                style={contextStyle ? contextStyle : ""}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`container modal__container ${modalAlignClass}`}>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );

}

export default Modal;
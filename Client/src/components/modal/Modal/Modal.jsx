import {createPortal} from "react-dom";

import "./modal.scss";
import MODAL_VARIANT from "../../../consts/modalVariants";
import xIcon from "../../../assets/icons/x.svg";
import Button from "../../../ui/Button/Button";
import {createContext, useContext} from "react";

const ModalContext = createContext(null);

const ModalRoot = ({variant, isOpen, onClose, boxRef, pos, children}) => {
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
        <ModalContext.Provider value={{onClose}}>
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
            </div>
        </ModalContext.Provider>,
        document.getElementById("modal-root")
    );
}

const Header = ({title = "", className = ""}) => {
    const {onClose} = useContext(ModalContext);

    return (
        <header className={`content modal__header text__title ${className}`}>
            <p>{title}</p>
            <button
                type="button"
                className="modal__close pointer"
                onClick={onClose}>
                <img src={xIcon} alt="Close modal"/>
            </button>
        </header>
    )
}

const Content = ({children, className = ""}) => {
    return <main className={`content modal__content ${className}`}>{children}</main>;
};

const Footer = ({formId = "", className = ""}) => {
    const {onClose} = useContext(ModalContext);

    return <footer className={`content modal__footer ${className}`}>
        <Button
            className="btn__day-limit--empty"
            type="button"
            onClick={onClose}>Cancel</Button>
        <Button
            className="btn__day-limit--fill"
            type="submit"
            form={formId}>Save</Button>
    </footer>
}

const Modal = Object.assign(ModalRoot, {
    Header,
    Content,
    Footer
});

export default Modal;
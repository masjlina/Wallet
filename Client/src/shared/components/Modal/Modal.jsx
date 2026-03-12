// React
import {createContext, useContext, useEffect, useState} from "react";
import {createPortal} from "react-dom";

// Shared
import MODAL_VARIANT from "@/shared/consts/modalVariants";

// UI
import Button from "@/ui/Button/Button";

// Local
import xIcon from "@/assets/icons/x.svg";

// Styles
import "./modal.scss";


const ModalContext = createContext(null);

const ModalRoot = ({
                       variant,
                       isOpen,
                       onClose,
                       boxRef,
                       pos,
                       toastOffset = 0,
                       children,
                       className = ""
                   }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (!isOpen) return;
        if (variant !== MODAL_VARIANT.TOAST) return;

        const autoClose = setTimeout(() => {
            onClose();
        }, 10000);

        return () => clearTimeout(autoClose);
    }, [isOpen, variant, onClose]);

    useEffect(() => {
        if (variant !== MODAL_VARIANT.TOAST) {
            setShouldRender(isOpen);
            return;
        }

        if (isOpen) {
            setShouldRender(true);
        }

        const timer = setTimeout(() => {
            setShouldRender(false);
        }, 7100);

        return () => clearTimeout(timer);
    }, [isOpen, variant]);

    const shouldDisplay = variant === MODAL_VARIANT.TOAST ? shouldRender : isOpen;
    if (!shouldDisplay) return null;

    let contextStyle = {};
    let modalPositionClass = "";
    let modalAlignClass = "";
    const isToast = variant === MODAL_VARIANT.TOAST;

    switch (variant) {
        case MODAL_VARIANT.CONTEXT:
            contextStyle = {
                position: "fixed",
                top: pos?.top,
                left: pos?.left,
            };
            break;

        case MODAL_VARIANT.CENTRAL:
            modalPositionClass = "d-center bg-inactive";
            modalAlignClass = "d-col";
            break;

        case MODAL_VARIANT.TOAST:
            modalPositionClass = "d-top-right";
            modalAlignClass = "d-col";

            break;

        default:
            break;
    }

    const content = (
        <div
            className={!isToast ? `modal__wrapper ${className}` : "notification__block"}
            ref={boxRef}
            style={contextStyle}
            onClick={(e) => {
                e.stopPropagation();
                isToast && onClose();
            }}
        >
            <div className={`container modal__container ${modalAlignClass}`}>
                {children}
            </div>
        </div>
    );

    return createPortal(
        <ModalContext.Provider value={{onClose}}>
            {isToast ? (
                <div
                    className={`modal__toast ${modalPositionClass} ${
                        isOpen ? "modal__toast--visible" : ""
                    }`}
                    style={{top: `${20 + toastOffset}px`}}
                >
                    {content}
                </div>
            ) : (
                <div
                    className={`modal__underlay ${modalPositionClass}`}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                >
                    {content}
                </div>
            )}
        </ModalContext.Provider>,
        document.getElementById("modal-root")
    );
};

const Header = ({
                    title = "",
                    className = "",
                    children
                }) => {
    const {onClose} = useContext(ModalContext);

    return (
        <header className={`content modal__header text__title ${className}`}>
            {children || <p>{title}</p>}
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

const Footer = ({
                    formId = "",
                    className = "",
                    confBtnClassName = "btn__primary",
                    confBtnType = "submit",
                    onConfBtnClick = "",
                    confBtnText = "Save",
                    children
                }) => {
    const {onClose} = useContext(ModalContext);

    return <footer className={`content modal__footer ${className}`}>
        <Button
            className="btn__primary--empty"
            type="button"
            onClick={onClose}>Cancel</Button>
        {children}
        <Button
            className={confBtnClassName}
            type={confBtnType}
            form={formId || undefined}
            onClick={onConfBtnClick || undefined}
        >
            {confBtnText}
        </Button>
    </footer>
}

const Modal = Object.assign(ModalRoot, {
    Header,
    Content,
    Footer
});

export default Modal;

// React
import {
    type ButtonHTMLAttributes,
    createContext,
    type ReactNode,
    type RefObject,
    useContext,
    useEffect,
    useState
} from "react";
import {createPortal} from "react-dom";

// Shared
import {MODAL_VARIANT, type ModalVariantType} from "@/shared/consts/modalVariants";

// Local
import xIcon from "@/assets/icons/x.svg";

// Styles
import "./modal.scss";
import Button from "@/ui/Button/Button.tsx";

type PositionType = {
    top: number,
    left: number
};

interface IBaseProps {
    children?: ReactNode | ReactNode[]
    className?: string
}

interface IModalRootProps extends IBaseProps {
    variant: ModalVariantType;
    isOpen: boolean;
    onClose: () => void;
    boxRef?: RefObject<any>
    pos?: PositionType
    toastOffset?: number;
}

interface IModalContext {
    onClose: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

const ModalRoot = ({
                       variant,
                       isOpen,
                       onClose,
                       boxRef,
                       pos,
                       toastOffset = 0,
                       children,
                       className = ""
                   }: IModalRootProps) => {
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

    const portalRoot = document.getElementById(isToast ? "toast-root" : "modal-root") ?? document.body;

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
        portalRoot
    );
};

interface IHeaderProps extends IBaseProps {
    title: string;
}

const Header = ({
                    title = "",
                    className = "",
                    children
                }: IHeaderProps) => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("Modal Header must be used within a Modal component");

    return (
        <header className={`content modal__header text__title ${className}`}>
            {children || <p>{title}</p>}
            <button
                type="button"
                className="modal__close pointer"
                onClick={context.onClose}>
                <img src={xIcon} alt="Close modal"/>
            </button>
        </header>
    )
}

interface IContentProps extends IBaseProps {
}

const Content = ({children, className = ""}: IContentProps) => {
    return <main className={`content modal__content ${className}`}>{children}</main>;
};

interface IFooterProps extends IBaseProps {
    formId?: string;
    confBtnClassName?: string,
    confBtnType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onConfBtnClick?: () => void;
    confBtnText?: string;
    isSubmitBtnDisabled?: boolean;
}

const Footer = ({
                    formId = "",
                    className = "",
                    confBtnClassName = "btn__primary",
                    confBtnType = "submit",
                    onConfBtnClick,
                    confBtnText = "Save",
                    isSubmitBtnDisabled = false,
                    children
                }: IFooterProps) => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("Modal.Footer must be used within a Modal component");

    return <footer className={`content modal__footer ${className}`}>
        <Button
            className="btn__primary--empty"
            type="button"
            onClick={context.onClose}>Cancel</Button>
        {children}
        <Button
            className={`${confBtnClassName} ${isSubmitBtnDisabled && "btn--disabled"}`}
            type={confBtnType}
            form={formId || undefined}
            onClick={onConfBtnClick || undefined}
            disabled={isSubmitBtnDisabled}
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

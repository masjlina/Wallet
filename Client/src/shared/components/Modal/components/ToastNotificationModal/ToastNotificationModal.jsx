import MODAL_VARIANT from "@/shared/consts/modalVariants";
import Modal from "@/shared/components/Modal/Modal";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";

import "./toastNotificationModal.scss";
import ToastIcon from "@/shared/components/ToastIcon/ToastIcon";

const ToastNotificationModal = ({isOpen, onClose, type = NOTIFICATION_INTENT.INFO, message, stackIndex = 0}) => {
    const messageToShow =
        message ?? `This is an ${type.toLowerCase()} message`;
    return (
        <Modal
            variant={MODAL_VARIANT.TOAST}
            isOpen={isOpen}
            toastOffset={stackIndex * 92}
            onClose={onClose}>
            <Modal.Content className={`notification notification--${type}`}>
                <div className="toast__content">
                    <ToastIcon type={type}/>
                    <div className="toast__message">
                        <h2 className="text__title">{type}</h2>
                        <p>{messageToShow}</p>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    )
}

export default ToastNotificationModal;

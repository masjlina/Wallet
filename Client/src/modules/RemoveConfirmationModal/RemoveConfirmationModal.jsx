import Modal from "../../components/modal/Modal/Modal";

import trashIcon from "../../assets/icons/trash--purple.svg";
import MODAL_VARIANT from "../../consts/modalVariants";

import "./RemoveConfirmationModal.scss";

const RemoveConfirmationModal = ({isOpen, onClose, onRemove, id}) => {
    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Content className="remove-confirmation__content">
                <img src={trashIcon} alt="trash bin" />

                <h1 className="text text__base--bold">
                    Delete this item?
                </h1>

                <div className="message">
                    <p>This item will be deleted.</p>
                    <p>You can’t restore it.</p>
                </div>
            </Modal.Content>
            <Modal.Footer
                confirmationButtonClassName="btn__primary--red"
                onConfirmationButtonClick={() => {
                    onRemove(id);
                    onClose();
                }
            }
                />
        </Modal>
    )
}

export default RemoveConfirmationModal;
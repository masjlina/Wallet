// Shared
import Modal from "@/shared/components/Modal/Modal";

// Local
import trashIcon from "@/assets/icons/trash--purple.svg";

// Styles
import "./RemoveConfirmationModal.scss";
import type {ReactNode} from "react";
import {MODAL_VARIANT} from "@/shared/consts/modalVariants.ts";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onRemove: () => void;
}

const RemoveConfirmationModal = ({
                                     isOpen,
                                     onClose,
                                     onRemove
                                 }: IProps): ReactNode => {
    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Content className="remove-confirmation__content">
                <img src={trashIcon} alt="trash bin"/>

                <h1 className="text text__base--bold">
                    Delete this item?
                </h1>

                <div className="message">
                    <p>This item will be deleted.</p>
                    <p>You can’t restore it.</p>
                </div>
            </Modal.Content>
            <Modal.Footer
                confBtnClassName="btn__primary--red"
                onConfBtnClick={onRemove}
                confBtnText="Delete"
            />
        </Modal>
    );
}

export default RemoveConfirmationModal;

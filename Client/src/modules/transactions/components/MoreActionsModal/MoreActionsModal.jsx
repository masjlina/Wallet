// React
import React, {useLayoutEffect, useRef, useState} from "react";

// Shared
import Modal from "@/shared/components/Modal/Modal";
import MODAL_VARIANT from "@/shared/consts/modalVariants";

// Local
import pencilIcon from "@/assets/icons/pencil.svg";
import trashIcon from "@/assets/icons/trash--red.svg";

const MoreActionsModal = ({isOpen, anchorEl, onClose, onEditTransaction, openConfirmation}) => {
    const boxRef = useRef(null);
    const [pos, setPos] = useState({top: 0, left: 0});

    useLayoutEffect(() => {
        if (!isOpen || !anchorEl || !boxRef.current) return;

        const rect = anchorEl.getBoundingClientRect();
        const modalRect = boxRef.current.getBoundingClientRect();

        setPos({
            top: rect.top - modalRect.height,
            left: rect.left - modalRect.width,
        });
    }, [isOpen, anchorEl]);

    return (
        <Modal
            variant={MODAL_VARIANT.CONTEXT}
            isOpen={isOpen}
            onClose={onClose}
            boxRef={boxRef}
            pos={pos}
        >
            <Modal.Content>
                <button
                    className="btn btn__nav btn__modal text--r"
                    type="button"
                    onClick={() => {
                        onEditTransaction();
                        onClose();
                    }}>
                    <img src={pencilIcon} alt="Edit"/>
                    Edit
                </button>

                <hr/>

                <button
                    className="btn btn__nav btn__modal text--red"
                    type="button"
                    onClick={() => {
                        openConfirmation();
                        onClose();
                    }}>
                    <img
                        src={trashIcon}
                        alt="Delete"/>
                    Delete
                </button>
            </Modal.Content>
        </Modal>
    );
};

export default MoreActionsModal;

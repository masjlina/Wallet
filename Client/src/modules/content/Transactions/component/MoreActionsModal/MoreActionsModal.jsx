import React, {useLayoutEffect, useRef, useState} from "react";
import pencilIcon from "../../../../../assets/icons/pencil.svg";
import trashIcon from "../../../../../assets/icons/trash--red.svg";
import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";

const MoreActionsModal = ({isOpen, anchorEl, onClose, onRemove, id}) => {
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
            <div className="content modal__content text text__base">
                <button className="btn btn__nav btn__modal text--r" type="button">
                    <img src={pencilIcon} alt="Edit"/>
                    Edit
                </button>

                <hr/>

                <button
                    className="btn btn__nav btn__modal text--red"
                    type="button"
                    onClick={() => onRemove(id)}>
                    <img
                        src={trashIcon}
                        alt="Delete"/>
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default MoreActionsModal;

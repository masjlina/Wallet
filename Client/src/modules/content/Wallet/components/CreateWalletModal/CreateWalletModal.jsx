import Modal from "../../../../../components/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";
import xIcon from "../../../../../assets/icons/x.svg";
import FieldWithLabel from "../../../../../components/FieldWithLabel/FieldWithLabel";
import Button from "../../../../../ui/Button/Button";

import "./createWalletModal.scss";

const CreateWalletModal = ({isOpen, onClose}) => {
    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <div className="content modal__content--top text__title">
                <p>Add transaction</p>
                <button type="button" className="modal__close pointer" onClick={onClose}>
                    <img src={xIcon} alt="Close modal"/>
                </button>

            </div>
            <form className="content modal__content create-wallet__content" id="create-wallet">
                <div className="input-section">
                    <div className="input-section">
                        <FieldWithLabel
                            id="wallet-name"
                            labelText="Name"
                            placeholder="Wallet name"/>
                    </div>
                </div>
            </form>
            <div className="content modal__content--bottom">
                <Button
                    className="btn__day-limit--empty"
                    type="button"
                    onClick={onClose}>Cancel</Button>
                <Button className="btn__day-limit--fill" type="submit" form="create-wallet">Save</Button>
            </div>
        </Modal>
    )
}

export default CreateWalletModal;
import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";
import Button from "../../../../../ui/Button/Button";

import "./createWalletModal.scss";
import useInput from "../../../../../hooks/useInput";
import NameField from "../../../../../components/NameField/NameField";

const CreateWalletModal = ({isOpen, onClose, onSubmit}) => {
    const name = useInput("");

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header title="Create wallet"/>

            <Modal.Content className="create-wallet__content">
                <form
                    id="create-wallet"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(name.value)
                    }}>
                    <NameField
                        value={name.value}
                        onChange={name.onChange}
                        placeholder="Wallet name"/>
                </form>
            </Modal.Content>

            <Modal.Footer formId="create-wallet"/>
        a</Modal>
    )
}

export default CreateWalletModal;
// Shared
import Modal from "@/shared/components/Modal/Modal";
import NameField from "@/shared/components/NameField/NameField";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import useInput from "@/shared/hooks/useInput";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "./createWalletModal.scss";

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
// Shared
import Modal from "@/shared/components/Modal/Modal";
import NameField from "@/shared/components/NameField/NameField";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import useInput from "@/shared/hooks/useInput";

// Styles
import "./walletModal.scss";
import ACCOUNT_TYPE from "@/shared/consts/accountType";

const WalletModal = ({isOpen, onClose, onSubmit}) => {
    const name = useInput("");

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header title="Create wallet"/>

            <Modal.Content className="create-wallet__content d-col">
                <form
                    id="create-wallet"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(ACCOUNT_TYPE.CASH, name.value);
                    }}>
                    <NameField
                        value={name.value}
                        onChange={name.onChange}
                        placeholder="Wallet name"/>
                </form>
            </Modal.Content>

            <Modal.Footer formId="create-wallet"/>
        </Modal>
    )
}

export default WalletModal;
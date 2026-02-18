import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";
import Button from "../../../../../ui/Button/Button";

import "./CreateAccountModal.scss";
import useInput from "../../../../../hooks/useInput";
import CardField from "../CardField/CardField";
import AmountInput from "../../../../../components/modal/AmountInput/AmountInput";
import {useEffect, useState} from "react";
import {isValidCardNumber} from "../../helpers/creditCardManager";
import ACCOUNT_TYPE from "../../../../../consts/accountType";
import FieldWithLabel from "../../../../../components/FieldWithLabel/FieldWithLabel";

const AccountModal = ({isOpen, onClose, onSubmit, account, accountType}) => {
    const nameInput = useInput(account?.name ?? "");
    const [balance, setBalance] = useState(account?.balance ?? 0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (account) {
            nameInput.setValue(account?.name ?? "");
            setBalance(account?.balance ?? 0);
        }
    }, [account]);

    const validateAndSubmit = () => {
        if (!Number.isFinite(balance)) {
            setErrorMessage("Incorrect amount");
            return;
        }

        if (
            accountType === ACCOUNT_TYPE.CARD &&
            !isValidCardNumber(nameInput.value)
        ) {
            setErrorMessage("Incorrect card number");
            return;
        }

        onSubmit({
            name: nameInput.value,
            balance,
            type: accountType
        });

        onClose();
    };

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header title={`${account ? "Edit" : "Create"} account`}/>

            <Modal.Content>
                <form
                    id="update-account"
                    onSubmit={(e) => {
                        e.preventDefault();
                        validateAndSubmit();
                    }}>
                    <AmountInput balance={balance} setBalance={setBalance}/>
                    {accountType === ACCOUNT_TYPE.CARD && (
                        <CardField
                            value={nameInput.value}
                            onChange={nameInput.setValue}/>
                    )}
                    {accountType === ACCOUNT_TYPE.CASH && (
                        <FieldWithLabel
                            labelText="Wallet name"
                            value={nameInput.value}
                            onChange={nameInput.onChange}/>
                    )}
                    {errorMessage ? <p className="text--red">{errorMessage}</p> : ""}
                </form>
            </Modal.Content>

            <Modal.Footer formId="update-account"/>
        </Modal>
    )
}

export default AccountModal;
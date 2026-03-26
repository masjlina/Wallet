// React
import {useEffect, useState} from "react";

// App (modules)
import CardField from "../CardField/CardField";
import {isValidCardNumber} from "@/modules/wallet-accounts";

// Shared
import FieldWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";
import AmountInput from "@/shared/components/Modal/components/AmountInput/AmountInput";
import Modal from "@/shared/components/Modal/Modal";
import ACCOUNT_TYPE from "@/shared/consts/accountType";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import useInput from "@/shared/hooks/useInput";

// Styles
import "./CreateAccountModal.scss";

const AccountModal = ({isOpen, onClose, onSubmit, account, accountType}) => {
    const nameInput = useInput(account?.name ?? "");
    const [balance, setBalance] = useState(account?.balance ?? 0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

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

        setIsBtnDisabled(true);

        onSubmit(accountType, {
            name: nameInput.value,
            balance,
        });

        nameInput.setValue("");
        setBalance(0);

        setIsBtnDisabled(false);
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

            <Modal.Footer formId="update-account" isSubmitBtnDisabled={isBtnDisabled}/>
        </Modal>
    )
}

export default AccountModal;
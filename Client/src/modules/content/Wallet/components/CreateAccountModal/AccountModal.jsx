import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";
import xIcon from "../../../../../assets/icons/x.svg";
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
            <div className="content modal__content--top text__title">
                <p>{account ? "Edit" : "Create"} account</p>
                <button type="button" className="modal__close pointer" onClick={onClose}>
                    <img src={xIcon} alt="Close modal"/>
                </button>

            </div>
            <form
                className="content modal__content create-wallet__content" id="create-wallet"
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

export default AccountModal;
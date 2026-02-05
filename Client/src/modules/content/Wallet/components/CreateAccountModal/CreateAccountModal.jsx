import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";
import xIcon from "../../../../../assets/icons/x.svg";
import Button from "../../../../../ui/Button/Button";

import "./CreateAccountModal.scss";
import useInput from "../../../../../hooks/useInput";
import CardField from "../CardField/CardField";
import AmountInput from "../../../../../components/modal/AmountInput/AmountInput";
import {useState} from "react";
import {isValidCardNumber} from "../../helpers/creditCardManager";

const CreateAccountModal = ({isOpen, onClose, onSubmit}) => {
    const cardNumberInput = useInput("");
    const [balance, setBalance] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const validateAndSubmit = () => {
        if (!Number.isFinite(balance)) {
            setErrorMessage("Incorrect amount");
            return;
        }

        if (!isValidCardNumber(cardNumberInput.value)) {
            setErrorMessage("Incorrect card number");
            return;
        }

        onSubmit({
            name: cardNumberInput.value,
            balance
        });

        cardNumberInput.setValue("");
        setBalance(0)
    };

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <div className="content modal__content--top text__title">
                <p>Create account</p>
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
                <AmountInput setBalance={setBalance}/>

                <CardField
                    value={cardNumberInput.value}
                    onChange={cardNumberInput.setValue}/>
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

export default CreateAccountModal;
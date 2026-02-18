import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";
import AmountInput from "../../../../../components/modal/AmountInput/AmountInput";
import useInput from "../../../../../hooks/useInput";
import {useEffect} from "react";

const DayLimitModal = ({
                           isOpen,
                           onClose,
                           userDailyLimit = 0,
                           onUpdateDailyLimit
                       }) => {
    const limitInput = useInput(userDailyLimit);

    useEffect(() => {
        limitInput.setValue(userDailyLimit);
    }, [userDailyLimit]);

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header title="Change daily limit"/>
            <Modal.Content>
                <form
                    id="change-daily-limit"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onUpdateDailyLimit(limitInput.value, onClose)
                    }}>

                    <AmountInput
                        balance={limitInput.value}
                        setBalance={limitInput.setValue}/>
                </form>
            </Modal.Content>
            <Modal.Footer formId="change-daily-limit"/>
        </Modal>
    )
}

export default DayLimitModal;
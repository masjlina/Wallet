// React
import {useEffect} from "react";

// Shared
import AmountInput from "@/shared/components/Modal/components/AmountInput/AmountInput";
import Modal from "@/shared/components/Modal/Modal";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import useInput from "@/shared/hooks/useInput";

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
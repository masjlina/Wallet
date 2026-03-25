// React
import {useEffect} from "react";

// Shared
import AmountInput from "@/shared/components/Modal/components/AmountInput/AmountInput";
import Modal from "@/shared/components/Modal/Modal";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import useInput from "@/shared/hooks/useInput";
import Button from "@/ui/Button/Button";
import {getRemainingMonthDays, getThisMonthDays} from "@/shared/services/dateTimeService";

import "./setLimitModal.scss";

const SetLimitModal = ({
                           isOpen,
                           onClose,
                           userLimit = 0,
                           userMonthlyLimit,
                           onUpdateLimit,
                           title = "Change daily limit",
                           isDaily = true
                       }) => {
    const limitInput = useInput(userLimit);

    useEffect(() => {
        limitInput.setValue(userLimit);
    }, [userLimit]);

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header title={title}/>
            <Modal.Content>
                <form
                    id="change-daily-limit"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onUpdateLimit(limitInput.value, onClose)
                    }}>

                    <AmountInput
                        balance={limitInput.value}
                        setBalance={limitInput.setValue}/>
                </form>
            </Modal.Content>
            <Modal.Footer
                formId="change-daily-limit"
                className="set-limit-modal__footer">
                {isDaily &&
                    <Button
                        className="btn__primary--empty set-limit-modal__shortcut"
                        type="button"
                        onClick={() => {
                            const days = getThisMonthDays();
                            const daily = userMonthlyLimit / days;

                            limitInput.setValue(Math.round(daily * 100) / 100);
                        }}>Calculate from monthly limit</Button>}
            </Modal.Footer>
        </Modal>
    )
};

export default SetLimitModal;

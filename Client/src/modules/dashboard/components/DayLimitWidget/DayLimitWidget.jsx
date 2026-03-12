// App (modules)
import SetLimitModal from "@/modules/dashboard/components/SetLimitModal/SetLimitModal";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";
import TRANSACTION_TYPE from "@/shared/consts/transactionTypes";
import useModal from "@/shared/hooks/useModal";

// UI
import Button from "@/ui/Button/Button";

// Local
import pencilIcon from "@/assets/icons/pencil--grey.svg";

// Styles
import "./dayLimitWidget.scss";

const DayLimitWidget = ({
                            openModal,
                            userDailyLimit,
                            userMonthlyLimit,
                            todayExpensesAmount,
                            onUpdateDailyLimit
                        }) => {
    const progress = userDailyLimit > 0 ? todayExpensesAmount / userDailyLimit : 0;
    const safeProgress = Math.min(progress, 1);
    const angle = safeProgress * 360;

    const dayLimitModal = useModal();

    return (
        <Widget>
            <Widget.Content className="content day-limit__graphic-content text">
                <div className="graphic">
                    <div className="graphic__background--radial">
                        <div
                            className="graphic__fill--radial"
                            style={{"--angle": `${angle}deg`}}
                        />

                        <div className="graphic__overlap--radial">
                            <p className="text__base text__base--inactive">Daily Limit</p>
                            <div className="d-row day-limit__input">
                                <p className="text__primary">${todayExpensesAmount}/{userDailyLimit}</p>
                                <button onClick={() => dayLimitModal.openModal()}>
                                    <img
                                        className="pencil"
                                        src={pencilIcon}
                                        alt="Pencil: Change daily limit"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Widget.Content>

            <Widget.Footer className="content day-limit__bottom-content text__btn">
                <Button
                    className="btn btn__primary"
                    onClick={() => openModal(TRANSACTION_TYPE.EXPENSE)}>
                    Expense
                </Button>
                <button
                    className="btn btn__primary--empty"
                    onClick={() => openModal(TRANSACTION_TYPE.INCOME)}>
                    Income
                </button>
            </Widget.Footer>
            <SetLimitModal
                isOpen={dayLimitModal.isOpen}
                onClose={dayLimitModal.closeModal}
                userLimit={userDailyLimit}
                userMonthlyLimit={userMonthlyLimit}
                onUpdateLimit={onUpdateDailyLimit}
            />
        </Widget>
    );
}

export default DayLimitWidget;
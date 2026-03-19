// Shared
import {Widget} from "@/shared/components/Widget/Widget";

// Styles
import "./monthBudgetWidget.scss";
import {formatAmountOfMoney} from "@/shared/services/moneyService";
import SetLimitModal from "@/modules/dashboard/components/SetLimitModal/SetLimitModal";
import useModal from "@/shared/hooks/useModal";
import pencilIcon from "@/assets/icons/pencil--grey.svg";
import {useMemo} from "react";

const MonthBudgetWidget = ({
                               userMonthlyLimit,
                               onUpdateMonthlyLimit,
                               spentThisMonth
                           }) => {
    const monthlyLimitModal = useModal();

    const remainingBalance = userMonthlyLimit - spentThisMonth;

    const progress = useMemo(() => {
        if (!userMonthlyLimit || userMonthlyLimit <= 0) return 0;

        const raw = spentThisMonth / userMonthlyLimit * 100;
        return Math.round(Math.min(Math.max(raw, 0), 100));
    }, [userMonthlyLimit, spentThisMonth]);

  return (
        <Widget className="month-limit">
            <Widget.Header>
                <div className="text text__title">Month Budget</div>
            </Widget.Header>

            <Widget.Content>
                <div className="content month-limit__left-content text">
                    <div className="widget__month-limit">
                        <p className="text__base">Month limit:</p>
                        <div className="d-row day-limit__input">
                            <p className="text text__base--bold">{formatAmountOfMoney(userMonthlyLimit)}</p>
                            <button onClick={monthlyLimitModal.openModal}>
                                <img
                                    className="pencil"
                                    src={pencilIcon}
                                    alt="Pencil: Change daily limit"/>
                            </button>
                        </div>

                    </div>

                    <div className="widget__spent-month">
                        <p className="text__base">Spent this month:</p>
                        <p className="text text__base--bold">{formatAmountOfMoney(spentThisMonth)}</p>
                    </div>

                    <div className="widget__rem-balance">
                        <p className="text__base">Remaining balance:</p>
                        <p className="text text__base--bold">{formatAmountOfMoney(remainingBalance)}</p>
                    </div>
                </div>

                <div className="content month-limit__right-content">
                    <div className="graphic">
                        <div className="graphic__background--bar">
                            <div
                                className="graphic__fill--bar"
                                style={{
                                    clipPath: `inset(${100 - progress}% 0 0 0 round 0px)`
                                }}
                            />
                            <p className={`graphic__fill--procent ${progress <= 60 ? "text" : "text__base--white"}`}>{progress}%</p>
                        </div>
                    </div>
                </div>
            </Widget.Content>

            <SetLimitModal
                isOpen={monthlyLimitModal.isOpen}
                onClose={monthlyLimitModal.closeModal}
                userLimit={userMonthlyLimit}
                onUpdateLimit={onUpdateMonthlyLimit}
                title="Change monthly limit"
                isDaily={false}
            />
        </Widget>
  );
}

export default MonthBudgetWidget;

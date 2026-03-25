import Modal from "@/shared/components/Modal/Modal";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import calendarIcon from "../../../assets/icons/calendar.svg";
import "./daySummaryModal.scss";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS} from "@/shared/consts/transactionTypes";
import {TransactionCol, TransactionRow} from "@/modules/transactions";
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDayTransactions} from "@/modules/transactions/helpers/transactionHelper";
import {formatAmountOfMoney, formatParentheses, getClazzAmountOfMoneyColor} from "@/shared/services/moneyService";
import Button from "@/ui/Button/Button";
import {getRemainingMonthDays} from "@/shared/services/dateTimeService";
import {createUserToUpdate} from "@/domain/user";
import {updateApplicationUser} from "@/modules/user";

const DaySummaryModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();

    const transactions = useSelector(state => state.transactions?.transactions);
    const userDailyLimit = useSelector(state => state.user?.user?.dailyLimit ?? -1);

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 1);

    const formattedDate = targetDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    const headerText = (
        <div className="d-row d-center day-summary__header">
            <img src={calendarIcon} className="icon--base-24" alt="Calendar"/>
            <p>Daily Summary: {formattedDate}</p>
        </div>
    );

    const tableHeaders = [
        TRANSACTION_COLUMNS.NAME,
        TRANSACTION_COLUMNS.AMOUNT
    ];

    const daysSummaryTransactions = useMemo(() => {
        return getDayTransactions(transactions, targetDate.toDateString());
    }, [transactions, targetDate]);

    const tableContent = daysSummaryTransactions.map(transaction => (
        <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            tableHeaders={tableHeaders}
        />
    ));

    const daysSummaryExpensesAmount = daysSummaryTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const daysSummaryIncomesAmount = daysSummaryTransactions
            .filter(t => t.amount >= 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const dayBalance = daysSummaryIncomesAmount - daysSummaryExpensesAmount;
    const daySummary = Number((userDailyLimit - daysSummaryExpensesAmount).toFixed(2));

    const onDistribute = async () => {
        const remainingDays = getRemainingMonthDays({ includeToday: true });

        if (remainingDays <= 0) return;

        const amountToAdd = daySummary / remainingDays;

        const newDailyLimit = Number(
            (userDailyLimit + amountToAdd).toFixed(2)
        );

        try {
            const userToUpdate = createUserToUpdate({
                dailyLimit: newDailyLimit
            });
            await dispatch(updateApplicationUser(userToUpdate));
            onClose();
        } catch (error) {
        }
    };

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header
                className="day-summary__header">
                {headerText}
            </Modal.Header>

            <Modal.Content className="day-summary__content">
                <div className="day-summary__text-block">
                    <p>
                        <span>Spent Today: </span>
                        <span
                            className={`text__primary text--inactive`}
                        >{formatAmountOfMoney(daysSummaryExpensesAmount)}</span>
                    </p>
                    <p>
                        <span>Income Today: </span>
                        <span
                            className={`text__primary ${getClazzAmountOfMoneyColor(daysSummaryIncomesAmount)}`}>
                            {formatAmountOfMoney(daysSummaryIncomesAmount)}</span>
                    </p>
                    <p>
                        <span>Day's Balance: </span>
                        <span
                            className={`text__primary ${getClazzAmountOfMoneyColor(dayBalance)}`}>
                             {formatAmountOfMoney(dayBalance)}
                        </span>
                    </p>
                    <p>
                        <span>Summary: </span>
                        <br/>
                        <br/>
                        <span>
                            {userDailyLimit} - {formatParentheses(daysSummaryExpensesAmount)} =
                            <span
                                className={getClazzAmountOfMoneyColor(daySummary)}>
                                {formatAmountOfMoney(daySummary)}
                            </span>
                        </span>
                    </p>
                </div>

                <div className="w-100">
                    <p className="text__title">Day's Activity</p>
                    <div className="table-scroll day-summary__table">
                        <table className="table text text__table">
                            <TransactionCol tableHeaders={tableHeaders}/>
                            <tbody className="text text__table--name">
                            {tableContent}
                            </tbody>
                        </table>
                    </div>

                </div>
            </Modal.Content>


            <Modal.Footer
                confBtnText="OK"
                onConfBtnClick={onClose}
                className="set-limit-modal__footer">
                <Button
                    className="btn__primary--empty set-limit-modal__shortcut"
                    type="button"
                    onClick={onDistribute}>Distribute</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DaySummaryModal;

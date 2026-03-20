import Modal from "@/shared/components/Modal/Modal";
import MODAL_VARIANT from "@/shared/consts/modalVariants";
import calendarIcon from "../../../assets/icons/calendar.svg";
import "./daySummaryModal.scss";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS} from "@/shared/consts/transactionTypes";
import {TransactionCol, TransactionRow} from "@/modules/transactions";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {getDayTransactions} from "@/modules/transactions/helpers/transactionHelper";
import {formatAmountOfMoney, getClazzAmountOfMoneyColor} from "@/shared/services/moneyService";

const DaySummaryModal = ({isOpen, onClose}) => {
    const transactions = useSelector(state => state.transactions?.transactions);

    const daysSummary = new Date();
    daysSummary.setDate(daysSummary.getDate() - 1);

    const formattedDate = daysSummary.toLocaleDateString(undefined, {
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
        return getDayTransactions(transactions, daysSummary.toDateString());
    }, [transactions]);

    const tableContent = daysSummaryTransactions.map(transaction => (
        <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            tableHeaders={tableHeaders}
        />
    ));

    const daysSummaryExpensesAmount = useMemo(() => {
        return daysSummaryTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }, [daysSummaryTransactions]);

    const daysSummaryIncomesAmount = useMemo(() => {
        return daysSummaryTransactions
            .filter(t => t.amount >= 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }, [daysSummaryTransactions]);

    const dayBalance = daysSummaryIncomesAmount - daysSummaryExpensesAmount;

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
                            className={`text__primary ${getClazzAmountOfMoneyColor(daysSummaryExpensesAmount)}`}
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
                </div>

                <div className="w-100">
                    <p className="text__title">Day's Activity</p>
                    <table className="table table__content text text__table">
                        <TransactionCol tableHeaders={tableHeaders}/>

                        <tbody className="text text__table--name">
                        {tableContent}
                        </tbody>
                    </table>
                </div>
            </Modal.Content>


            <Modal.Footer
                confBtnText="OK"/>
        </Modal>
    );
}

export default DaySummaryModal;
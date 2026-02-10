import "./transactionTypeSwitcher.scss";
import TRANSACTION_TYPE from "../../../consts/transactionTypes";
import {useEffect} from "react";

const TransactionTypeSwitcher = ({ transactionType, onChange }) => {
    return (
        <div className="transaction-switcher text__base">
            <button
                type="button"
                className={`btn__transaction-switcher ${
                    transactionType === TRANSACTION_TYPE.EXPENSE ? "text" : ""
                }`}
                onClick={() => onChange(TRANSACTION_TYPE.EXPENSE)}
            >
                Expense
            </button>

            <button
                type="button"
                className={`btn__transaction-switcher ${
                    transactionType === TRANSACTION_TYPE.INCOME ? "text" : ""
                }`}
                onClick={() => onChange(TRANSACTION_TYPE.INCOME)}
            >
                Income
            </button>

            <div
                className={`btn__transaction-switcher--accent ${
                    transactionType === TRANSACTION_TYPE.INCOME ? "right" : "left"
                }`}
            />
        </div>
    );
};

export default TransactionTypeSwitcher;
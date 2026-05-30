// Shared
import TRANSACTION_TYPE, {type TransactionType} from "@/shared/consts/transactionTypes";

// Styles
import "./transactionTypeSwitcher.scss";
import type {ReactNode} from "react";

interface IProps {
    transactionType: TransactionType;
    onChange: (nextType: TransactionType) => void;
}

const TransactionTypeSwitcher = ({transactionType, onChange}: IProps): ReactNode => {
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

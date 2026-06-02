// Shared
import {ACCOUNT_TYPE} from "@/shared/consts/accountType.ts";
import {
    TRANSACTION_COLUMNS,
    TRANSACTION_TYPE,
    type TransactionColType,
    type TransactionType
} from "@/shared/consts/transactionTypes";
import {formatAmountOfMoney} from "@/shared/services/moneyService";
import type {MouseEvent} from "react";
// Local
import dotsIcon from "@/assets/icons/dots.svg";

// Styles
import "./transactionRow.scss";
import type {ITransaction} from "@/domain/transaction.ts";

interface IProps {
    onContextOpen?: (e: MouseEvent<HTMLButtonElement>, transaction: ITransaction) => void,
    type: TransactionType,
    transaction: ITransaction
    tableHeaders: TransactionColType[],
    onClick?: () => void
}

const TransactionRow = ({
                            onContextOpen,
                            type = TRANSACTION_TYPE.EXPENSE,
                            transaction,
                            tableHeaders = [],
                            onClick
                        }: IProps) => {
    if (!transaction) return null;

    const { name, amount, createdAt, category, walletId } = transaction;

    const d = new Date(createdAt);

    const localDate =
        d.toLocaleDateString() + "\n" +
        d.toLocaleTimeString();
    const formattedAmount = formatAmountOfMoney(amount);
    const paymentMethod = walletId ? ACCOUNT_TYPE.CASH : ACCOUNT_TYPE.CARD;

    const iconClazz =
        type === TRANSACTION_TYPE.EXPENSE
            ? "icon--table__expense"
            : "icon--table__income";

    return (
        <tr className="table__row-new" onClick={onClick}>
            {tableHeaders.map(col => {
                switch (col) {
                    case TRANSACTION_COLUMNS.NAME:
                        return (
                            <td key={col}>
                                <div className="table__first-block">
                                    <div className={iconClazz}/>
                                    <div className="text__table--name">{name}</div>
                                </div>
                            </td>
                        );

                    case TRANSACTION_COLUMNS.AMOUNT:
                        return (
                            <td key={col} className={amount < 0 ? "text--red" : "text--green"}>
                                {formattedAmount}
                            </td>
                        );

                    case TRANSACTION_COLUMNS.CATEGORY:
                        return <td key={col}>{category}</td>;

                    case TRANSACTION_COLUMNS.PAYMENT_METHOD:
                        return <td key={col}>{paymentMethod}</td>;

                    case TRANSACTION_COLUMNS.DATE:
                        return <td key={col} className="text__table--date">{localDate}</td>;

                    case TRANSACTION_COLUMNS.ACTION:
                        return (
                            <td key={col}>
                                <button
                                    type="button"
                                    className="btn btn_more-actions"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onContextOpen)
                                            onContextOpen(e, transaction);
                                    }}
                                >
                                    <img src={dotsIcon} alt="more actions"/>
                                </button>
                            </td>
                        );

                    default:
                        return null;
                }
            })}
        </tr>
    );
};

export default TransactionRow
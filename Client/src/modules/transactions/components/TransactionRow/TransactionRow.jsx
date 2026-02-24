// Shared
import accountType from "@/shared/consts/accountType";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS} from "@/shared/consts/transactionTypes";
import {formatAmountOfMoney} from "@/shared/services/moneyService";

// Local
import dotsIcon from "@/assets/icons/dots.svg";

// Styles
import "./transactionRow.scss";

const TransactionRow = ({
                            onContextOpen,
                            type = TRANSACTION_TYPE.EXPENSE,
                            transaction,
                            setId,
                            tableHeaders = [],
        onClick
                        }) => {
    if (!transaction) return null;

    const { id, name, amount, createdAt, category, walletId } = transaction;

    const d = new Date(createdAt);

    const localDate =
        d.toLocaleDateString() + "\n" +
        d.toLocaleTimeString();
    const formattedAmount = formatAmountOfMoney(amount);
    const paymentMethod = walletId ? accountType.CASH : accountType.CARD;

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
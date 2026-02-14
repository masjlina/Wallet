import dotsIcon from "../../../../../assets/icons/dots.svg";

import "./transactionRow.scss";
import TRANSACTION_TYPE from "../../../../../consts/transactionTypes";
import {formatAmountOfMoney} from "../../../../../services/moneyService";
import accountType from "../../../../../consts/accountType";
const TransactionRow = ({
                            onModalOpen,
                            type = TRANSACTION_TYPE.EXPENSE,
                            transaction,
                            setId,
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
            <td>
                <div className="table table__first-block">
                    <div className={iconClazz}/>
                    <div className="text__table--name">{name}</div>
                </div>
            </td>

            <td className={amount < 0 ? "text--red" : "text--green"}>
                {formattedAmount}
            </td>

            <td>{category}</td>
            <td>{paymentMethod}</td>

            <td className="text__table--date">
                {localDate}
            </td>

            <td>
                <button
                    type="button"
                    className="btn btn_more-actions"
                    onClick={(e) => {
                        e.stopPropagation();
                        setId(id);
                        onModalOpen(e);
                    }}
                >
                    <img src={dotsIcon} alt="more actions" />
                </button>

            </td>
        </tr>
    );
};

export default TransactionRow
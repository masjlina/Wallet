import dotsIcon from "../../../../../assets/icons/dots.svg";

import "./transactionRow.scss";

const TransactionRow = ({onModalOpen}) => {
    return (
        <tr className="table__row-new">
            <td>
                <div className="table table__first-block">
                    <div className="icon--table__expense"/>
                    <div className="text__table--name">Iphone 13 Pro MAX</div>
                </div>
            </td>

            <td className="text text--red">-$5.30</td>
            <td>Groceries</td>
            <td>Cash</td>

            <td className="text__table--date">
                12 Jan 2020
                <br/>
                09:34
            </td>

            <td className="text__table--date">
                <img
                    className="btn btn_more-actions"
                    src={dotsIcon}
                    alt="more actions"
                    onClick={onModalOpen}
                />
            </td>
        </tr>
    );
}

export default TransactionRow;
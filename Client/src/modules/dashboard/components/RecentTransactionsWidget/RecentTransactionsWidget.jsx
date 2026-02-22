// React
import React from "react";

// External libs
import {useNavigate} from "react-router-dom";

// App (modules)
import {TransactionCol} from "@/modules/transactions";
import {TransactionRow} from "@/modules/transactions";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";
import {ROUTES} from "@/shared/consts/routes";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS} from "@/shared/consts/transactionTypes";

// Local
import rightArrow from "@/assets/icons/right-arrow.svg";

// Styles
import "./recentTransactionsWidget.scss";

const RecentTransactionsWidget = ({transactions}) => {
    const navigate = useNavigate();

    const tableHeaders = [
        TRANSACTION_COLUMNS.NAME,
        TRANSACTION_COLUMNS.AMOUNT,
        TRANSACTION_COLUMNS.CATEGORY,
        TRANSACTION_COLUMNS.DATE
    ];

    const content = Array.isArray(transactions) && transactions.map(transaction => {
        return <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            onClick={() => onSelectTransaction(transaction.id)}
            tableHeaders={tableHeaders}/>
    })

  return (
    <Widget>
        <Widget.Header>
            <div className="text text__title">Recent Transactions</div>

            <button
                className="view-all text__link"
                onClick={() => navigate(ROUTES.TRANSACTIONS)}>
                <div
                    className="text text__link">
                    View All
                </div>
                <img
                    className="icon--widget__arrow"
                    src={rightArrow}
                    alt="Right arrow"
                />
            </button>
        </Widget.Header>

        <Widget.Content className="recent-transactions__table-content text text__table">
            <div className="table-scroll scroll-y">
                <table className="table table__content text text__table">
                    <TransactionCol tableHeaders={tableHeaders}/>

                    <tbody className="text text__table--name scroll-y">
                    {content}
                    </tbody>
                </table>
            </div>
        </Widget.Content>

    </Widget>
  );
};

export default RecentTransactionsWidget;

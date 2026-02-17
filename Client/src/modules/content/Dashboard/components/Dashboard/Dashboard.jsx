import MonthBudgetWidget from "../MonthBudgetWidget/MonthBudgetWidget";
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import MyAccountWidget from "../MyAccountWidget/MyAccountWidget";
import RecentTransactionsWidget from "../RecentTransactionsWidget/RecentTransactionsWidget";
import MonthActivityWidget from "../MonthActivityWidget/MonthActivityWidget";

import "./dashboard.scss";
import useModal from "../../../../../hooks/useModal";
import TransactionModal from "../../../Transactions/component/CreateTransactionModal/TransactionModal";
import {createUserTransaction} from "../../../Wallet/store/transactionsThunks";
import {useDispatch} from "react-redux";
import TRANSACTION_TYPE from "../../../../../consts/transactionTypes";
import {useState} from "react";

const Dashboard = () => {
    const dispatch = useDispatch();

    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.EXPENSE);

    const transactionModal = useModal();

    const onCreateTransaction = async (transaction) => {
        try {
            await dispatch(createUserTransaction(transaction));
            transactionModal.closeModal();
        } catch (error) {
        }
    }

    const onOpenTransactionModalWithType = (type) => {
        if (type)
            setTransactionType(type);
        transactionModal.openModal();
    }

    return (
        <div className="container content__container">
            <div className="content dashboard__content--top">
                <MonthBudgetWidget/>
                <DayLimitWidget
                    openModal={onOpenTransactionModalWithType}/>
                <MyAccountWidget/>
            </div>

            <div className="content dashboard__content--bottom">
                <RecentTransactionsWidget/>
                <MonthActivityWidget/>
            </div>
            <TransactionModal
                isOpen={transactionModal.isOpen}
                onClose={transactionModal.closeModal}
                onCreate={onCreateTransaction}
                type={transactionType}
            />
        </div>
    )
}

export {Dashboard};
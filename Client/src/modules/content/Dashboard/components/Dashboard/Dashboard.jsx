import MonthBudgetWidget from "../MonthBudgetWidget/MonthBudgetWidget";
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import MyAccountWidget from "../MyAccountWidget/MyAccountWidget";
import RecentTransactionsWidget from "../RecentTransactionsWidget/RecentTransactionsWidget";
import MonthActivityWidget from "../MonthActivityWidget/MonthActivityWidget";

import "./dashboard.scss";
import useModal from "../../../../../hooks/useModal";
import TransactionModal from "../../../Transactions/component/CreateTransactionModal/TransactionModal";
import {createUserTransaction, getAllUserTransactions} from "../../../Wallet/store/transactionsThunks";
import {useDispatch, useSelector} from "react-redux";
import TRANSACTION_TYPE from "../../../../../consts/transactionTypes";
import {useEffect, useMemo, useState} from "react";
import {updateApplicationUser} from "../../store/userThunks";
import {createUserToUpdate} from "../../../../../domain/user";

const Dashboard = () => {
    const dispatch = useDispatch();

    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.EXPENSE);

    const transactionModal = useModal();

    const userDailyLimit = useSelector(state => state.user?.user?.dailyLimit ?? -1);
    const transactions = useSelector(state => state.transactions.transactions);

    useEffect(() => {
        if (!transactions.length)
            dispatch(getAllUserTransactions());
    }, [dispatch, transactions]);

    const todayExpensesAmount = useMemo(() => {
        const today = new Date().toDateString();

        return transactions
            .filter(t => new Date(t.createdAt).toDateString() === today)
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }, [transactions]);

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

    const onUpdateDailyLimit = async (limit, closeModal) => {
        try {
            const userToUpdate = createUserToUpdate({
                dailyLimit: limit
            });
            await dispatch(updateApplicationUser(userToUpdate));
            closeModal();
        } catch (error) {
        }
    }

    return (
        <div className="container content__container">
            <div className="content dashboard__content--top">
                <MonthBudgetWidget/>
                <DayLimitWidget
                    openModal={onOpenTransactionModalWithType}
                    userDailyLimit={userDailyLimit}
                    todayExpensesAmount={todayExpensesAmount}
                    onUpdateDailyLimit={onUpdateDailyLimit}/>
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
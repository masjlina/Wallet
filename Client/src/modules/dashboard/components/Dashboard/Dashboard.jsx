// React
import {useEffect, useMemo, useState} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";

// App (modules)
import {createUserToUpdate} from "@/domain/user";
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import MonthActivityWidget from "../MonthActivityWidget/MonthActivityWidget";
import MonthBudgetWidget from "../MonthBudgetWidget/MonthBudgetWidget";
import MyAccountWidget from "../MyAccountWidget/MyAccountWidget";
import RecentTransactionsWidget from "../RecentTransactionsWidget/RecentTransactionsWidget";
import {
    createUserTransaction,
    getAllUserTransactions,
    getTodayTransactions,
    TransactionModal
} from "@/modules/transactions";
import {updateApplicationUser} from "@/modules/user";

// Shared
import TRANSACTION_TYPE from "@/shared/consts/transactionTypes";
import useModal from "@/shared/hooks/useModal";

// Styles
import "./dashboard.scss";
import {getThisMonthTransactions} from "@/modules/transactions/helpers/transactionHelper";

const Dashboard = () => {
    const dispatch = useDispatch();
    const userDailyLimit = useSelector(state => state.user?.user?.dailyLimit ?? -1);
    const userMonthlyLimit = useSelector(state => state.user?.user?.monthlyLimit ?? -1);

    const transactions = useSelector(state => state.transactions.transactions);
    const accounts = [
        ...useSelector(state => state.accounts.accounts) ?? [],
        useSelector(state => state.wallet.wallet)
    ];

    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.EXPENSE);

    const transactionModal = useModal();

    const todayTransactions = useMemo(() => {
        return getTodayTransactions(transactions);
    }, [transactions])

    const todayExpensesAmount = useMemo(() => {
        return todayTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }, [todayTransactions]);

    const spentThisMonth = useMemo(() => {
        return getThisMonthTransactions(transactions)
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }, [transactions]);

    useEffect(() => {
        if (!transactions)
            dispatch(getAllUserTransactions());
    }, [dispatch, transactions]);

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

    const onUpdateMonthlyLimit = async (limit, closeModal) => {
        try {
            const userToUpdate = createUserToUpdate({
                monthlyLimit: limit
            });
            await dispatch(updateApplicationUser(userToUpdate));
            closeModal();
        } catch (error) {
        }
    }

    return (
        <div className="container content__container">
            <div className="content dashboard__content--top">
                <MonthBudgetWidget
                    userMonthlyLimit={userMonthlyLimit}
                    spentThisMonth={spentThisMonth}
                    onUpdateMonthlyLimit={onUpdateMonthlyLimit}/>

                <DayLimitWidget
                    openModal={onOpenTransactionModalWithType}
                    userDailyLimit={userDailyLimit}
                    todayExpensesAmount={todayExpensesAmount}
                    onUpdateDailyLimit={onUpdateDailyLimit}/>

                <MyAccountWidget
                    accounts={accounts}/>
            </div>

            <div className="content dashboard__content--bottom">
                <RecentTransactionsWidget transactions={todayTransactions}/>
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

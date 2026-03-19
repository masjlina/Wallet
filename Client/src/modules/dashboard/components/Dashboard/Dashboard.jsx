// React
import {useEffect, useMemo, useState} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";

// App (modules)
import {createUserToUpdate} from "@/domain/user";
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import WeekActivityWidget from "@/modules/dashboard/components/WeekActivityWidget/WeekActivityWidget";
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
import {getThisMonthTransactions, getWeekTransactions} from "@/modules/transactions/helpers/transactionHelper";
import {getDayAgo} from "@/shared/services/dateTimeService";
import {getAllWalletAccounts, getUserWallet} from "@/modules/wallet-accounts";

const Dashboard = () => {
    const dispatch = useDispatch();
    const userDailyLimit = useSelector(state => state.user?.user?.dailyLimit ?? -1);
    const userMonthlyLimit = useSelector(state => state.user?.user?.monthlyLimit ?? -1);

    const transactions = useSelector(state => state.transactions.transactions);
    const accountsList = useSelector(state => state.accounts.accounts) ?? [];
    const wallet = useSelector(state => state.wallet.wallet);

    const accounts = useMemo(() => {
        return wallet ? [...accountsList, wallet] : accountsList;
    }, [accountsList, wallet]);

    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.EXPENSE);

    const transactionModal = useModal();

    const todayTransactions = useMemo(() => {
        return getTodayTransactions(transactions);
    }, [transactions]);

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

    const everyDaySpentThisWeek = useMemo(() => {
        const weekTransactions = getWeekTransactions(transactions);
        const result = [];

        for (let i = 6; i >= 0; i--) {
            const targetDay = getDayAgo(i);

            const daySum = weekTransactions
                .filter(
                    (t) =>
                        t.amount < 0 &&
                        new Date(t.createdAt).toDateString() ===
                        new Date(targetDay).toDateString()
                )
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);

            result.push(daySum);
        }

        return result;
    }, [transactions]);

    useEffect(() => {
        dispatch(getAllUserTransactions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllWalletAccounts());
        dispatch(getUserWallet());
    }, [dispatch]);

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
        <div className="container content__container dashboard">
            <div className="dashboard__content--top">
                <MonthBudgetWidget
                    userMonthlyLimit={userMonthlyLimit}
                    spentThisMonth={spentThisMonth}
                    onUpdateMonthlyLimit={onUpdateMonthlyLimit}/>

                <DayLimitWidget
                    openModal={onOpenTransactionModalWithType}
                    userDailyLimit={userDailyLimit}
                    userMonthlyLimit={userMonthlyLimit}
                    todayExpensesAmount={todayExpensesAmount}
                    onUpdateDailyLimit={onUpdateDailyLimit}/>

                <MyAccountWidget
                    accounts={accounts}/>
            </div>

            <div className="dashboard__content--bottom">
                <RecentTransactionsWidget transactions={todayTransactions}/>
                <WeekActivityWidget
                    everyDaySpentThisWeek={everyDaySpentThisWeek}/>
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

// React
import {useEffect, useMemo, useState} from "react";

// External libs
// App (modules)
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import WeekActivityWidget from "@/modules/dashboard/components/WeekActivityWidget/WeekActivityWidget";
import MonthBudgetWidget from "../MonthBudgetWidget/MonthBudgetWidget";
import MyAccountWidget from "../MyAccountWidget/MyAccountWidget.tsx";
import RecentTransactionsWidget from "../RecentTransactionsWidget/RecentTransactionsWidget";
import {
    createUserTransaction,
    getAllUserTransactions,
    getTodayTransactions,
    TransactionModal
} from "@/modules/transactions";
import {updateApplicationUser} from "@/modules/user";

// Shared
import {TRANSACTION_TYPE, type TransactionType} from "@/shared/consts/transactionTypes";
import useModal from "@/shared/hooks/useModal";

// Styles
import "./dashboard.scss";
import {getThisMonthTransactions, getWeekTransactions} from "@/modules/transactions/helpers/transactionHelper";
import {getDayAgo} from "@/shared/services/dateTimeService";
import {getAllWalletAccounts, getUserWallet} from "@/modules/wallet-accounts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";
import type {IUpdateUserRequest} from "@/modules/user/api/types/updateUserRequest.ts";
import type {IUpsertTransactionRequest} from "@/modules/transactions/api/types/upsertTransactionRequest.ts";

export type OnUpdateLimitType = (limit: number, closeModal: () => void) => void;

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const userDailyLimit = useAppSelector(state => state.user?.user?.dailyLimit ?? -1);
    const userMonthlyLimit = useAppSelector(state => state.user?.user?.monthlyLimit ?? -1);

    const transactions = useAppSelector(state => state.transactions?.transactions ?? []);
    const accountsList = useAppSelector(state => state.accounts?.accounts) ?? [];
    const wallet = useAppSelector(state => state.wallet?.wallet);

    const accounts = useMemo(() => {
        return wallet ? [...accountsList, wallet] : accountsList;
    }, [accountsList, wallet]);

    const [transactionType, setTransactionType] = useState<TransactionType>(TRANSACTION_TYPE.EXPENSE);

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
        return  getThisMonthTransactions(transactions)
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0)
            .toFixed(2);

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

    const onCreateTransaction = async (transaction: IUpsertTransactionRequest) => {
            await dispatch(createUserTransaction(transaction));
            transactionModal.closeModal();
    }

    const onOpenTransactionModalWithType = (type: TransactionType) => {
        if (type)
            setTransactionType(type);
        transactionModal.openModal();
    }

    const onUpdateDailyLimit: OnUpdateLimitType = async (limit: number, closeModal: () => void) => {
        const userToUpdate: IUpdateUserRequest = {
                dailyLimit: limit
        };

        await dispatch(updateApplicationUser(userToUpdate));
        closeModal();
    }


    const onUpdateMonthlyLimit: OnUpdateLimitType = async (limit, closeModal) => {
        const userToUpdate: IUpdateUserRequest = {
            dailyLimit: limit
        };

        await dispatch(updateApplicationUser(userToUpdate));
        closeModal();
    }

    return (
        <div className="container content__container dashboard">
            <div className="dashboard__content--top">
                <MonthBudgetWidget
                    userMonthlyLimit={userMonthlyLimit}
                    spentThisMonth={+spentThisMonth}
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

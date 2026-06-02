// React
import {useEffect, useMemo} from "react";

// App (modules)
import TransactionModal from "../CreateTransactionModal/TransactionModal";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal";
import TransactionCol from "../TransactionCol/TransactionCol";
import TransactionRow from "../TransactionRow/TransactionRow";
import {filterTransactionsByType, useTransactionsController} from "@/modules/transactions";

// Shared
import RemoveConfirmationModal from "@/shared/components/RemoveConfirmationModal/RemoveConfirmationModal";
import ButtonCreateEntity from "@/shared/components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Filter from "@/shared/components/Toolbar/components/Filter/Filter";
import Toolbar from "@/shared/components/Toolbar/Toolbar";
import {Widget} from "@/shared/components/Widget/Widget";
import {
    TRANSACTION_COLUMNS,
    TRANSACTION_FILTER_TYPE,
    TRANSACTION_TYPE,
    type TransactionFilterType
} from "@/shared/consts/transactionTypes";
import {usePersistedState} from "@/shared/hooks/usePersistedState";

// Styles
import "./transactions.scss";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";

const Transactions = () => {
    const transactionsController = useTransactionsController();

    const [currentFilter, setCurrentFilter] =
        usePersistedState("filter", TRANSACTION_FILTER_TYPE.ALL);

    const transactions = useAppSelector(
        state => state.transactions.transactions || []
    );

    const filteredTransactions = useMemo(() => {
        return filterTransactionsByType(currentFilter, transactions);
    }, [transactions, currentFilter]);

    useEffect(() => {
        transactionsController.getAll();
    }, []);

    const tableHeaders = Object.values(TRANSACTION_COLUMNS);

    const onChangeCurrentFilter = (newFilter: TransactionFilterType) => {
        setCurrentFilter(newFilter);
    };

    const content = filteredTransactions?.map(transaction => {
        return <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            onContextOpen={transactionsController.openContext}
            tableHeaders={tableHeaders}
            onClick={() => transactionsController.openTransaction(transaction)}
        />
    });

    return (
        <div className="container content__container">
            <Toolbar>
                <Filter
                    currentFilter={currentFilter}
                    filters={Object.values(TRANSACTION_FILTER_TYPE)}
                    onChangeCurrentFilter={onChangeCurrentFilter}/>
                <ButtonCreateEntity onClick={() => transactionsController.openTransaction()} text="Add transaction"/>
            </Toolbar>

            <Widget>
                <Widget.Content className="table-scroll">
                    <table className="table table__content text text__table">
                        <TransactionCol tableHeaders={tableHeaders}/>

                        <tbody className="text text__table--name scroll-y">
                        {content}
                        </tbody>
                    </table>
                </Widget.Content>
            </Widget>

            <MoreActionsModal
                isOpen={transactionsController.contextModal.isOpen}
                anchorEl={transactionsController.contextModal.anchorEl}
                onClose={transactionsController.contextModal.closeModal}
                onEditTransaction={transactionsController.openTransaction}
                openConfirmation={transactionsController.openConfirm}
            />

            <TransactionModal
                isOpen={transactionsController.transactionModal.isOpen}
                onClose={transactionsController.transactionModal.closeModal}
                onCreate={transactionsController.create}
                onUpdate={transactionsController.update}
                transaction={transactionsController.selected}/>

            <RemoveConfirmationModal
                isOpen={transactionsController.confirmModal.isOpen}
                onClose={transactionsController.confirmModal.closeModal}
                onRemove={transactionsController.remove}
            />
        </div>
    );
};

export {Transactions};

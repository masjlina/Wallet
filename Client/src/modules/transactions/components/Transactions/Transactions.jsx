// React
import React, {useEffect, useMemo, useState} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";

// App (modules)
import TransactionModal from "../CreateTransactionModal/TransactionModal";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal";
import TransactionCol from "../TransactionCol/TransactionCol";
import TransactionRow from "../TransactionRow/TransactionRow";
import {
    createUserTransaction,
    getAllUserTransactions,
    removeUserTransaction,
    updateUserTransaction
} from "@/modules/transactions";

// Shared
import RemoveConfirmationModal from "@/shared/components/RemoveConfirmationModal/RemoveConfirmationModal";
import ButtonCreateEntity from "@/shared/components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Filter from "@/shared/components/Toolbar/components/Filter/Filter";
import Toolbar from "@/shared/components/Toolbar/Toolbar";
import {Widget} from "@/shared/components/Widget/Widget";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS, TRANSACTION_FILTER_TYPE} from "@/shared/consts/transactionTypes";
import useModal from "@/shared/hooks/useModal";

// Styles
import "./transactions.scss";

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [id, setId] = useState("");
    const [currentFilter, setCurrentFilter] = useState(() => localStorage.getItem("filter") || TRANSACTION_FILTER_TYPE.ALL);

    const filteredTransactions = useMemo(() => {
        switch (currentFilter) {
            case TRANSACTION_FILTER_TYPE.INCOME:
                return transactions.filter(t => t.amount >= 0);

            case TRANSACTION_FILTER_TYPE.EXPENSE:
                return transactions.filter(t => t.amount < 0);

            default:
                return transactions;
        }
    }, [transactions, currentFilter]);

    const contextModal = useModal();
    const transactionModal = useModal();
    const removeConfirmationModal = useModal();

    const tableHeaders = Object.values(TRANSACTION_COLUMNS);

    useEffect(() => {
        try {
            dispatch(getAllUserTransactions());
        } catch (error) {
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("filter", currentFilter);
    }, [currentFilter]);

    useEffect(() => {
        if (!transactionModal.isOpen) setSelectedTransaction(null);
    }, [transactionModal.isOpen]);

    const onCreateTransaction = async (transaction) => {
        try {
            await dispatch(createUserTransaction(transaction));
            transactionModal.closeModal();
        } catch (error) {
        }
    }

    const onUpdateTransaction = async (transaction) => {
        try {
            await dispatch(updateUserTransaction({
                transactionId: selectedTransaction.id,
                transaction: transaction
            }));
            transactionModal.closeModal();
        } catch (error) {
        }
    }

    const onRemoveTransaction = async (transactionId) => {
        try {
            await dispatch(removeUserTransaction(transactionId));
            contextModal.closeModal();
        } catch (error) {
        }
    }

    const onSelectTransaction = (id) => {
        const transactionToSelect = filteredTransactions.find(transaction => {
            if (transaction.id === id) return transaction
        });
        setSelectedTransaction(transactionToSelect);
        transactionModal.openModal();
    }

    const onChangeCurrentFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }

    const content = Array.isArray(filteredTransactions) && filteredTransactions.map(transaction => {
        return <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            onModalOpen={(e) => contextModal.openModal(e)}
            setId={setId}
            onClick={() => onSelectTransaction(transaction.id)}
            tableHeaders={tableHeaders}
        />
    })

    return (
        <div className="container content__container">
            <Toolbar>
                <Filter
                    currentFilter={currentFilter}
                    filters={Object.values(TRANSACTION_FILTER_TYPE)}
                    onChangeCurrentFilter={onChangeCurrentFilter}/>
                <ButtonCreateEntity onClick={transactionModal.openModal} text="Add transaction"/>
            </Toolbar>

            <Widget>
                <Widget.Content>
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

            {/*Context Modal*/}
            <MoreActionsModal
                isOpen={contextModal.isOpen}
                anchorEl={contextModal.anchorEl}
                onClose={contextModal.closeModal}
                onSelectTransaction={onSelectTransaction}
                id={id}
                openConfirmation={removeConfirmationModal.openModal}
            />

            <TransactionModal
                isOpen={transactionModal.isOpen}
                onClose={transactionModal.closeModal}
                onCreate={onCreateTransaction}
                onUpdate={onUpdateTransaction}
                transaction={selectedTransaction}/>

            <RemoveConfirmationModal
                isOpen={removeConfirmationModal.isOpen}
                onClose={removeConfirmationModal.closeModal}
                onRemove={onRemoveTransaction}
                id={id}
            />
        </div>
    );
};

export {Transactions};

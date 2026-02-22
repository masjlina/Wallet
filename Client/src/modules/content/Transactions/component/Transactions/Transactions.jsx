import React, {useEffect, useState} from "react";

import TransactionRow from "../TransactionRow/TransactionRow";
import {Widget} from "../../../../../components/Widget/Widget";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal";
import TransactionModal from "../CreateTransactionModal/TransactionModal";
import useModal from "../../../../../hooks/useModal";

import "./transactions.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Sort from "../../../components/Toolbar/components/Sort/Sort";
import {useDispatch, useSelector} from "react-redux";
import {
    createUserTransaction,
    getAllUserTransactions,
    removeUserTransaction,
    updateUserTransaction
} from "../../../Wallet/store/transactionsThunks";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS} from "../../../../../consts/transactionTypes";
import TransactionCol from "../TransactionCol/TransactionCol";
import RemoveConfirmationModal from "../../../../RemoveConfirmationModal/RemoveConfirmationModal";

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [id, setId] = useState("");

    const contextModal = useModal();
    const transactionModal = useModal();
    const removeConfirmationModal = useModal();

    const tableHeaders = Object.values(TRANSACTION_COLUMNS);

    useEffect(() => {
        try {
            dispatch(getAllUserTransactions());
        } catch (error) {
        }
    }, [dispatch])

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
        const transactionToSelect = transactions.find(transaction => {
            if (transaction.id === id) return transaction
        });
        setSelectedTransaction(transactionToSelect);
        transactionModal.openModal();
    }

    const content = Array.isArray(transactions) && transactions.map(transaction => {
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
                <Sort names={["All", "Incomes", "Expenses"]}/>
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

            {/*Context modal*/}
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

import React, {useEffect, useState} from "react";

import TransactionRow from "../TransactionRow/TransactionRow";
import {Widget} from "../../../../../components/Widget/Widget";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal";
import CreateTransactionModal from "../CreateTransactionModal/CreateTransactionModal";
import useModal from "../../../../../hooks/useModal";

import "./transactions.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Sort from "../../../components/Toolbar/components/Sort/Sort";
import {useDispatch, useSelector} from "react-redux";
import {
    createUserTransaction,
    getAllUserTransactions,
    removeUserTransaction
} from "../../../Wallet/store/transactionsThunks";
import TRANSACTION_TYPE from "../../../../../consts/transactionTypes";

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);

    const [id, setId] = useState("");

    const contextModal = useModal();
    const createTransactionModal = useModal();

    useEffect(() => {
        try {
            dispatch(getAllUserTransactions());
        } catch (error) {
        }
    }, [dispatch])

    const onCreateTransaction = async (transaction) => {
        try {
            await dispatch(createUserTransaction(transaction));
            createTransactionModal.closeModal();
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

    const content = Array.isArray(transactions) && transactions.map(transaction => {
        return <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            onModalOpen={(e) => contextModal.openModal(e)}
            setId={setId}/>
    })

    return (
        <div className="container content__container">
            <Toolbar>
                <Sort names={["All", "Incomes", "Expenses"]}/>
                <ButtonCreateEntity onClick={createTransactionModal.openModal} text="Add transaction"/>
            </Toolbar>

            <Widget>
                <Widget.Content>
                    <div className="table-scroll scroll-y">
                    <table className="table table__content text text__table">
                        <thead>
                        <tr>
                            <th scope="col">NAME/BUSINESS</th>
                            <th>AMOUNT</th>
                            <th>CATEGORY</th>
                            <th>PAYMENT METHODS</th>
                            <th>DATE</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>

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
                onRemove={onRemoveTransaction}
                id={id}
            />

            <CreateTransactionModal
                isOpen={createTransactionModal.isOpen}
                onClose={createTransactionModal.closeModal}
                onSubmit={onCreateTransaction}/>
        </div>
    );
};

export {Transactions};

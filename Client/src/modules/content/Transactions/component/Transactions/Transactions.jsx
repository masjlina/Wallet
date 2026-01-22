import React from "react";

import TransactionRow from "../TransactionRow/TransactionRow";
import {Widget} from "../../../../../components/Widget/Widget";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";
import useModal from "../../../../../hooks/useModal";

import "./transactions.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Sort from "../../../components/Toolbar/components/Sort/Sort";

const Transactions = () => {
    const contextModal = useModal();
    const formModal = useModal();

    return (
        <div className="container content__container">
            <Toolbar>
                <Sort names={["All", "Incomes", "Expenses"]}/>
                <ButtonCreateEntity onClick={formModal.openModal} text="Add transaction"/>
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
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        <TransactionRow onModalOpen={(e) => contextModal.openModal(e)}/>
                        </tbody>
                    </table>
                    </div>
                </Widget.Content>
            </Widget>

            {/*Context modal*/}
            <MoreActionsModal
                isOpen={contextModal.isOpen}
                anchorEl={contextModal.anchorEl}
                onClose={() => contextModal.closeModal()}
            />

            {/*Edit transaction modal*/}
            <AddTransactionModal
                isOpen={formModal.isOpen}
                onClose={() => formModal.closeModal()}/>
        </div>
    );
};

export {Transactions};

// React
import React, {useEffect, useMemo} from "react";

// External libs
import {useSelector} from "react-redux";
import {useMatch, useNavigate, useParams} from "react-router-dom";

// App (modules)
import {MonthActivityWidget} from "@/modules/dashboard";
import AccountModal from "../CreateAccountModal/AccountModal";
import {checkAccountType, formatCardNumber, maskCardNumber} from "@/modules/wallet-accounts";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";
import ACCOUNT_TYPE from "@/shared/consts/accountType";
import {ROUTES} from "@/shared/consts/routes";
import {formatAmountOfMoney} from "@/shared/services/moneyService";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "./accountDetails.scss";
import RemoveConfirmationModal from "@/shared/components/RemoveConfirmationModal/RemoveConfirmationModal";
import {filterTransactionByAccount, useTransactionsController} from "@/modules/transactions";
import TransactionRow from "../../../transactions/components/TransactionRow/TransactionRow";
import TRANSACTION_TYPE, {TRANSACTION_COLUMNS} from "@/shared/consts/transactionTypes";
import TransactionCol from "../../../transactions/components/TransactionCol/TransactionCol";
import {useAccountsController} from "@/modules/wallet-accounts/hooks/useAccountsController";
import MoreActionsModal from "../../../transactions/components/MoreActionsModal/MoreActionsModal";
import TransactionModal from "../../../transactions/components/CreateTransactionModal/TransactionModal";

const AccountDetails = () => {
    const accountsController = useAccountsController();
    const transactionsController = useTransactionsController();

    const transactions = useSelector(state => state.transactions.transactions);

    const navigate = useNavigate();

    const {id} = useParams();
    const isWallet = !!useMatch(`${ROUTES.WALLET}/:id`);
    const account = useSelector(state => {
        if (isWallet) return state.wallet.wallet;
        return state.accounts.accounts?.find(acc => acc.id === Number(id));
    });

    const filteredTransactions = useMemo(() => {
        return filterTransactionByAccount(
            {
                type: isWallet ? ACCOUNT_TYPE.CASH : ACCOUNT_TYPE.CARD,
                id: Number(id),
            },
            transactions
        );
    }, [transactions, id, isWallet]);

    const tableHeaders = Object.values(TRANSACTION_COLUMNS);

    useEffect(() => {
        if (!account) {
            if (isWallet) {
                accountsController.getWallet();
            } else {
                accountsController.getAccountById(id);
            }
            transactionsController.getAll();
        }
    }, [account, isWallet, id, accountsController, transactionsController]);

    if (!account) {
        return (
            <div className="container content__container">
                <p>Loading account…</p>
            </div>
        );
    }

    const content = filteredTransactions.map(transaction => {
        return <TransactionRow
            key={transaction.id}
            transaction={transaction}
            type={transaction.amount <= 0 ? TRANSACTION_TYPE.EXPENSE : TRANSACTION_TYPE.INCOME}
            tableHeaders={tableHeaders}
            onClick={() => transactionsController.openTransaction(transaction)}
            onContextOpen={transactionsController.openContext}
        />
    })

    return (
        <div className="container content__container">
            <div className="account-details__top">
                <Widget>
                    <Widget.Content className="d-col account-details__info">
                        <div className="text">
                            <p className="text--inactive">Account number</p>
                            <p className="text__base--bold">{isWallet ? "Wallet" : maskCardNumber(formatCardNumber(account.name))}</p>
                        </div>

                        <div className="text">
                            <p className="text--inactive">Balance</p>
                            <p className="text__base--bold">{formatAmountOfMoney(account.balance)}</p>
                        </div>
                    </Widget.Content>
                    <Widget.Footer className="account-details__btn-group">
                        <Button
                            className="account-details__btn"
                            onClick={() => accountsController.openAccount(account)}>
                            <p>Edit details</p>
                        </Button>
                        {isWallet ?
                            "" :
                            <button
                                className="btn text--red"
                                onClick={() => accountsController.openConfirm(account)}>Remove</button>
                        }
                    </Widget.Footer>
                </Widget>
                <MonthActivityWidget/>
            </div>

            <div className="account-details__bottom">
                <Widget>
                    <Widget.Content className="table-scroll">
                            <table className="table table__content text text__table">
                                <TransactionCol tableHeaders={tableHeaders}/>

                                <tbody className="text text__table--name">
                                {content}
                                </tbody>
                            </table>
                    </Widget.Content>
                </Widget>
            </div>
            <AccountModal
                isOpen={accountsController.accountModal.isOpen}
                onClose={accountsController.accountModal.closeModal}
                onSubmit={accountsController.update}
                account={accountsController.selected}
                accountType={checkAccountType(accountsController?.selected) === ACCOUNT_TYPE.CASH ? ACCOUNT_TYPE.CARD : ACCOUNT_TYPE.CASH}/>

            <TransactionModal
                isOpen={transactionsController.transactionModal.isOpen}
                onClose={transactionsController.transactionModal.closeModal}
                onCreate={transactionsController.create}
                onUpdate={transactionsController.update}
                transaction={transactionsController.selected}/>

            <MoreActionsModal
                isOpen={transactionsController.contextModal.isOpen}
                anchorEl={transactionsController.contextModal.anchorEl}
                onClose={transactionsController.contextModal.closeModal}
                onEditTransaction={transactionsController.openTransaction}
                openConfirmation={transactionsController.openConfirm}
            />
            <RemoveConfirmationModal
                isOpen={accountsController.confirmModal.isOpen}
                onClose={accountsController.confirmModal.closeModal}
                onRemove={() => {
                    accountsController.remove();
                    navigate(ROUTES.WALLET);
                }}/>

            <RemoveConfirmationModal
                isOpen={transactionsController.confirmModal.isOpen}
                onClose={transactionsController.confirmModal.closeModal}
                onRemove={transactionsController.remove}/>
        </div>
    )
}

export default AccountDetails;
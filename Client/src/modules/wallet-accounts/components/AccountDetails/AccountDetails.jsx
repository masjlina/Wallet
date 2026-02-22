// React
import React, {useEffect} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";
import {useMatch, useNavigate, useParams} from "react-router-dom";

// App (modules)
import {createAccountToUpdate} from "@/domain/account";
import { createWalletToUpdate} from "@/domain/wallet";
import {MonthActivityWidget} from "@/modules/dashboard";
import AccountModal from "../CreateAccountModal/AccountModal";
import {formatCardNumber, maskCardNumber} from "@/modules/wallet-accounts";
import {getWalletAccount, removeWalletAccount, updateWalletAccount} from "@/modules/wallet-accounts";
import {getUserWallet, updateUserWallet} from "../../store/walletThunks";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";
import ACCOUNT_TYPE from "@/shared/consts/accountType";
import {ROUTES} from "@/shared/consts/routes";
import useModal from "@/shared/hooks/useModal";
import {formatAmountOfMoney} from "@/shared/services/moneyService";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "./accountDetails.scss";

const AccountDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editAccountModal = useModal();

    const {id} = useParams();
    const isWallet = !!useMatch(`${ROUTES.WALLET}/:id`);
    const account = useSelector((state) => {
        if (isWallet) {
            return state.wallet.wallet;
        }

        return state.accounts.accounts ? state.accounts.accounts.find(
                (acc) => acc.id === Number(id)) :
            null;
    });

    useEffect(() => {
        if (!account) {
            if (isWallet)
                dispatch(getUserWallet());
            else
                dispatch(getWalletAccount(id));
        }
    }, [dispatch]);

    const onEditAccount = async (account) => {
        if (account.type === ACCOUNT_TYPE.CARD) {
            await dispatch(updateWalletAccount({
                accountId: id,
                account: createAccountToUpdate(account)
            }));
        } else {
            await dispatch(updateUserWallet({
                walletId: id,
                wallet: createWalletToUpdate(account)
            }))
        }
    }

    const onRemoveAccount = async (accountId) => {
        try {
            await dispatch(removeWalletAccount(accountId));
            navigate(ROUTES.WALLET);
        } catch (error) {
        }
    }

    if (!account) {
        return (
            <div className="container content__container">
                <p>Loading account…</p>
            </div>
        );
    }

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
                            onClick={() => editAccountModal.openModal()}>
                            <p>Edit details</p>
                        </Button>
                        {isWallet ?
                            "" :
                            <button
                                className="btn text--red"
                                onClick={() => onRemoveAccount(id)}>Remove</button>
                        }
                    </Widget.Footer>
                </Widget>
                <MonthActivityWidget/>
            </div>

            <div className="account-details__bottom">
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
                                {/*{content}*/}
                                </tbody>
                            </table>
                        </div>
                    </Widget.Content>
                </Widget>
            </div>
            <AccountModal
                isOpen={editAccountModal.isOpen}
                onClose={editAccountModal.closeModal}
                onSubmit={onEditAccount}
                account={account}
                accountType={isWallet ? ACCOUNT_TYPE.CASH : ACCOUNT_TYPE.CARD}/>
        </div>
    )
}

export default AccountDetails;
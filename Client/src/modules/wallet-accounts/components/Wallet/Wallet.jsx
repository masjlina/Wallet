// React
import {useEffect, useState} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

// App (modules)
import AccountWidget from "../AccountWidget/AccountWidget";
import AccountModal from "../CreateAccountModal/AccountModal";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";
import {formatCardNumber} from "@/modules/wallet-accounts";
import {createWalletAccount, getAllWalletAccounts, removeWalletAccount} from "@/modules/wallet-accounts";
import {createUserWallet, getUserWallet} from "../../store/walletThunks";

// Shared
import RemoveConfirmationModal from "@/shared/components/RemoveConfirmationModal/RemoveConfirmationModal";
import ButtonCreateEntity from "@/shared/components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Toolbar from "@/shared/components/Toolbar/Toolbar";
import {Widget} from "@/shared/components/Widget/Widget";
import ACCOUNT_TYPE from "@/shared/consts/accountType";
import {ROUTES} from "@/shared/consts/routes";
import useModal from "@/shared/hooks/useModal";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "./wallet.scss";

const Wallet = () => {
    const dispatch = useDispatch();
    const wallet = useSelector(state => state.wallet.wallet);
    const user = useSelector(state => state.auth.user);
    const accounts = useSelector(state => state.accounts.accounts);

    const [accountIdToRemove, setAccountIdToRemove] = useState(0);

    const navigate = useNavigate();

    const createWalletModal = useModal();
    const createAccountModal = useModal();
    const removeConfirmationModal = useModal();

    useEffect(() => {
        if (user) {
            dispatch(getUserWallet());
            dispatch(getAllWalletAccounts());
        }
    }, [user]);


    const onCreateWallet = async (walletName) => {
        try {
            await dispatch(createUserWallet(walletName));
            createWalletModal.closeModal();
        } catch (error) {
        }
    }

    const onCreateAccount = async (account) => {
        try {
            await dispatch(createWalletAccount(account));
            createAccountModal.closeModal();
        } catch (error) {
        }
    }

    const onRemoveAccount = async (accountId) => {
        try {
            await dispatch(removeWalletAccount(accountId));
        } catch (error) {
        }
    }

    const onNavigateToDetails = (account) => {
        const [[type, id]] = Object.entries(account);

        if (type === ACCOUNT_TYPE.CASH)
            navigate(`${ROUTES.WALLET}/${id}`);
        else
            navigate(`${ROUTES.CREDIT_CARDS}/${id}`);
    };


    let content;

    if (!wallet) {
        content =
            <Widget>
                <Widget.Content className="text text__title d-center">
                    <Button
                        className="btn__add"
                        onClick={createWalletModal.openModal}>Create wallet</Button>
                </Widget.Content>
            </Widget>
    } else {
        let accountsToRender = [
            <AccountWidget
                key="cash"
                accountType={ACCOUNT_TYPE.CASH}
                name={wallet.name}
                amount={wallet.balance}
                onNavigateToDetails={() => onNavigateToDetails({
                    [ACCOUNT_TYPE.CASH]: wallet.id
                })}
                />
        ];

        if (Array.isArray(accounts)) {
            accountsToRender = [
                ...accountsToRender,
                ...accounts.map(card => (
                    <AccountWidget
                        key={card.id}
                        amount={card.balance}
                        name={formatCardNumber(card.name)}
                        setAccountIdToRemove={() => setAccountIdToRemove(card.id)}
                        openConfirmationModal={removeConfirmationModal.openModal}
                        onNavigateToDetails={() => onNavigateToDetails({
                            [ACCOUNT_TYPE.CARD]: card.id
                        })}
                    />
                ))
            ];
        }

        content =
            <>
                <Toolbar>
                    <div/>
                    <ButtonCreateEntity onClick={createAccountModal.openModal} text="Add account"/>
                </Toolbar>

                <div className="accounts">
                    {accountsToRender}
                </div>
            </>
    }

    return (
        <div className="container content__container">
            {content}
            <CreateWalletModal
                isOpen={createWalletModal.isOpen}
                onClose={createWalletModal.closeModal}
                onSubmit={onCreateWallet}/>
            <AccountModal
                isOpen={createAccountModal.isOpen}
                onClose={createAccountModal.closeModal}
                onSubmit={onCreateAccount}
                accountType={ACCOUNT_TYPE.CARD}/>
            <RemoveConfirmationModal
                isOpen={removeConfirmationModal.isOpen}
                onClose={removeConfirmationModal.closeModal}
                onRemove={onRemoveAccount}
                id={accountIdToRemove}/>
        </div>
    );
}

export {Wallet};

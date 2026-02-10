import "./wallet.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUserWallet, getUserWallet} from "../../store/walletThunks";
import {Widget} from "../../../../../components/Widget/Widget";
import Button from "../../../../../ui/Button/Button";
import useModal from "../../../../../hooks/useModal";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";
import AccountWidget from "../AccountWidget/AccountWidget";
import ACCOUNT_TYPE from "../../../../../consts/accountType";
import CreateAccountModal from "../CreateAccountModal/CreateAccountModal";
import {createWalletAccount, getAllWalletAccounts, removeWalletAccount} from "../../store/accountsThunks";
import {formatCardNumber} from "../../helpers/creditCardManager";

const Wallet = () => {
    const dispatch = useDispatch();
    const wallet = useSelector(state => state.wallet.wallet);
    const user = useSelector(state => state.auth.user);
    const accounts = useSelector(state => state.accounts.accounts);

    const createWalletModal = useModal();
    const createAccountModal = useModal();

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

    let content = "";

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
        let accounts = [
            <AccountWidget
                key="cash"
                accountType={ACCOUNT_TYPE.CASH}
                amount={wallet.cash}
                />
        ];

        if (Array.isArray(accounts)) {
            accounts = [
                ...accounts,
                ...wallet.creditCards.map(card => (
                    <AccountWidget
                        key={card.id}
                        amount={card.balance}
                        cardNumber={formatCardNumber(card.name)}
                        onRemove={() => onRemoveAccount(card.id)}
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
                    {accounts}
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
            <CreateAccountModal
                isOpen={createAccountModal.isOpen}
                onClose={createAccountModal.closeModal}
                onSubmit={onCreateAccount}/>
        </div>
    );
}

export {Wallet};
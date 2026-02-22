import "./wallet.scss";
import Toolbar from "../../../components/Toolbar/components/Toolbar/Toolbar";
import ButtonCreateEntity from "../../../components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUserWallet, getUserWallet} from "../../store/walletThunks";
import {Widget} from "../../../../../components/Widget/Widget";
import Button from "../../../../../ui/Button/Button";
import useModal from "../../../../../hooks/useModal";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";
import AccountWidget from "../AccountWidget/AccountWidget";
import ACCOUNT_TYPE from "../../../../../consts/accountType";
import AccountModal from "../CreateAccountModal/AccountModal";
import {createWalletAccount, getAllWalletAccounts, removeWalletAccount} from "../../store/accountsThunks";
import {formatCardNumber} from "../../helpers/creditCardManager";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../../consts/routes";
import RemoveConfirmationModal from "../../../../RemoveConfirmationModal/RemoveConfirmationModal";

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
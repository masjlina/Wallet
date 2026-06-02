// React
import {useEffect} from "react";

// External libs
import {useNavigate} from "react-router-dom";

// App (modules)
import AccountWidget from "../AccountWidget/AccountWidget";
import AccountModal from "../CreateAccountModal/AccountModal";
import WalletModal from "../CreateWalletModal/WalletModal";
import {formatCardNumber} from "@/modules/wallet-accounts";

// Shared
import RemoveConfirmationModal from "@/shared/components/RemoveConfirmationModal/RemoveConfirmationModal";
import ButtonCreateEntity from "@/shared/components/Toolbar/components/ButtonCreateEntity/ButtonCreateEntity";
import Toolbar from "@/shared/components/Toolbar/Toolbar";
import {Widget} from "@/shared/components/Widget/Widget";
import {ACCOUNT_TYPE} from "@/shared/consts/accountType";
import {ROUTES} from "@/shared/consts/routes";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "./wallet.scss";
import {useAccountsController} from "@/modules/wallet-accounts/hooks/useAccountsController";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import type {IWallet} from "@/domain/wallet.ts";
import type {ICreditCard} from "@/domain/creditCard.ts";

const Wallet = () => {
    const accountsController = useAccountsController();

    const wallet = useAppSelector(state => state.wallet.wallet);
    const accounts = useAppSelector(state => state.accounts.creditCards);

    const navigate = useNavigate();

    useEffect(() => {
        accountsController.getAll();
    }, []);

    const onNavigateToDetails = (account: IWallet | ICreditCard) => {
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
                        onClick={accountsController.walletModal.openModal}>Create wallet</Button>
                </Widget.Content>
            </Widget>
    } else {
        let accountsToRender = [
            <AccountWidget
                key="cash"
                id={wallet.id}
                accountType={ACCOUNT_TYPE.CASH}
                name={wallet.name}
                amount={wallet.balance}
                onNavigateToDetails={onNavigateToDetails}

            />
        ];

        if (Array.isArray(accounts)) {
            accountsToRender = [
                ...accountsToRender,
                ...accounts.map(card => (
                    <AccountWidget
                        key={card.id}
                        id={card.id}
                        amount={card.balance}
                        name={formatCardNumber(card.name)}
                        openConfirmationModal={() => accountsController.openConfirm(card)}
                        onNavigateToDetails={onNavigateToDetails}
                    />
                ))
            ];
        }

        content =
            <>
                <Toolbar>
                    <div/>
                    <ButtonCreateEntity onClick={accountsController.accountModal.openModal} text="Add account"/>
                </Toolbar>

                <div className="accounts__scroll">
                    <div className="accounts">
                        {accountsToRender}
                    </div>
                </div>
            </>
    }

    return (
        <div className="container content__container wallet-page">
            {content}
            <WalletModal
                isOpen={accountsController.walletModal.isOpen}
                onClose={accountsController.walletModal.closeModal}
                onSubmit={accountsController.create}/>
            <AccountModal
                isOpen={accountsController.accountModal.isOpen}
                onClose={accountsController.accountModal.closeModal}
                onSubmit={accountsController.create}
                accountType={ACCOUNT_TYPE.CARD}/>
            <RemoveConfirmationModal
                isOpen={accountsController.confirmModal.isOpen}
                onClose={accountsController.confirmModal.closeModal}
                onRemove={accountsController.remove}/>
        </div>
    );
}

export {Wallet};

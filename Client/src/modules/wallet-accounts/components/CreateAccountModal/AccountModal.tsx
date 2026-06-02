// React
import {useEffect, useState} from "react";

// App (modules)
import CardField from "../CardField/CardField";
import {isValidCardNumber} from "@/modules/wallet-accounts";

// Shared
import FieldWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";
import AmountInput from "@/shared/components/Modal/components/AmountInput/AmountInput";
import Modal from "@/shared/components/Modal/Modal";
import {ACCOUNT_TYPE, type AccountType} from "@/shared/consts/accountType";
import {MODAL_VARIANT} from "@/shared/consts/modalVariants";
import useInput from "@/shared/hooks/useInput";

// Styles
import "./CreateAccountModal.scss";
import type {ICreditCard} from "@/domain/creditCard.ts";
import type {ICreateWalletRequest} from "@/modules/wallet-accounts/api/types/createWalletRequest.ts";
import type {ICreateCreditCardRequest} from "@/modules/wallet-accounts/api/types/createCreditCardRequest.ts";
import type {IWallet} from "@/domain/wallet.ts";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (type: AccountType, data: ICreateWalletRequest | ICreateCreditCardRequest) => Promise<void>;
    account?: ICreditCard | IWallet | undefined;
    accountType?: AccountType;
}

const AccountModal = ({
                          isOpen,
                          onClose,
                          onSubmit,
                          account,
                          accountType
                      }: IProps) => {
    const nameInput = useInput(account?.name ?? "");
    const [balance, setBalance] = useState(account?.balance ?? 0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        if (account) {
            nameInput.setValue(account?.name ?? "");
            setBalance(account?.balance ?? 0);
        }
    }, [account]);

    const validateAndSubmit = async () => {
        if (!Number.isFinite(balance)) {
            setErrorMessage("Incorrect amount");
            return;
        }

        if (
            accountType === ACCOUNT_TYPE.CARD &&
            !isValidCardNumber(nameInput.value)
        ) {
            setErrorMessage("Incorrect card number");
            return;
        }

        setIsBtnDisabled(true);

        if (accountType) {
            await onSubmit(accountType, {
                name: nameInput.value,
                balance: balance
            })
        }

        nameInput.setValue("");
        setBalance(0);

        setIsBtnDisabled(false);
        onClose();
    };

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Header title={`${account ? "Edit" : "Create"} account`}/>

            <Modal.Content>
                <form
                    id="update-account"
                    onSubmit={(e) => {
                        e.preventDefault();
                        validateAndSubmit();
                    }}>
                    <AmountInput balance={balance} setBalance={setBalance}/>
                    {accountType === ACCOUNT_TYPE.CARD && (
                        <CardField
                            value={nameInput.value}
                            onChange={nameInput.setValue}/>
                    )}
                    {accountType === ACCOUNT_TYPE.CASH && (
                        <FieldWithLabel
                            id="wallet-input"
                            labelText="Wallet name"
                            value={nameInput.value}
                            onChange={nameInput.onChange}/>
                    )}
                    {errorMessage ? <p className="text--red">{errorMessage}</p> : ""}
                </form>
            </Modal.Content>

            <Modal.Footer formId="update-account" isSubmitBtnDisabled={isBtnDisabled}/>
        </Modal>
    )
}

export default AccountModal;
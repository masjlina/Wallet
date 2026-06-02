// React
import {type ChangeEvent, useEffect, useMemo, useState} from "react";

// App (modules)
import {type ITransaction} from "@/domain/transaction";
import getInitialTransactionFormState from "../../helpers/getInitialTransactionFormState.ts";
import {getAllWalletAccounts, getUserWallet} from "@/modules/wallet-accounts";

// Shared
import FieldWithIcon from "@/shared/components/FieldWithIcon/FieldWithIcon";
import FieldWithLabel from "@/shared/components/FieldWithLabel/FieldWithLabel";
import AmountInput from "@/shared/components/Modal/components/AmountInput/AmountInput";
import TransactionTypeSwitcher
    from "@/shared/components/Modal/components/TransactionTypeSwitcher/TransactionTypeSwitcher";
import Modal from "@/shared/components/Modal/Modal";
import {ACCOUNT_TYPE} from "@/shared/consts/accountType";
import {MODAL_VARIANT} from "@/shared/consts/modalVariants";
import {TRANSACTION_TYPE, type TransactionType} from "@/shared/consts/transactionTypes";
import useInput from "@/shared/hooks/useInput";

// Local
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import calendarIcon from "@/assets/icons/calendar.svg";

// Styles
import "./addTransactionModal.scss";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import type {IUpsertTransactionRequest} from "@/modules/transactions/api/types/upsertTransactionRequest.ts";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (transaction: IUpsertTransactionRequest) => Promise<void>;
    onUpdate?: (transaction: IUpsertTransactionRequest) => Promise<void>;
    transaction?: ITransaction;
    type?: TransactionType;
}

const TransactionModal = ({
                              isOpen,
                              onClose,
                              onCreate,
                              onUpdate,
                              transaction,
                              type
                          }: IProps) => {
    const dispatch = useAppDispatch();

    const accounts = useAppSelector(state => state.accounts.accounts);
    const wallet = useAppSelector(state => state.wallet.wallet);

    const initialForm = useMemo(
        () => getInitialTransactionFormState(transaction),
        [transaction]);

    const nameInput = useInput<string>("");
    const descriptionInput = useInput<string>("");
    const balanceInput = useInput<number>(0);
    const accountInput = useInput<string>("");
    const dateTimeInput = useInput<string>("");

    const [transactionType, setTransactionType] = useState(
        type ??
        (initialForm.amount > 0
            ? TRANSACTION_TYPE.INCOME
            : TRANSACTION_TYPE.EXPENSE)
    );
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        const form = getInitialTransactionFormState(transaction);

        nameInput.setValue(form.name);
        descriptionInput.setValue(form.description);
        balanceInput.setValue(form.amount);
        accountInput.setValue(wallet ? `${ACCOUNT_TYPE.CASH}: ${wallet.id}` : form.account);
        dateTimeInput.setValue(form.createdAt);

        if (form.amount !== 0) {
            setTransactionType(
                form.amount > 0
                    ? TRANSACTION_TYPE.INCOME
                    : TRANSACTION_TYPE.EXPENSE
            );
        }
    }, [transaction, wallet]);

    useEffect(() => {
        dispatch(getAllWalletAccounts());
        dispatch(getUserWallet());
    }, [dispatch]);

    useEffect(() => {
        if (!isOpen || !type) return;

        setTransactionType(type);

        balanceInput.setValue(prev =>
            type === TRANSACTION_TYPE.EXPENSE
                ? -Math.abs(prev || 0)
                : Math.abs(prev || 0)
        );

    }, [isOpen, type]);

    useEffect(() => {
        const amount = Number(balanceInput.value);

        if (Number.isNaN(amount) || amount === 0) return;

        const expectedType =
            amount > 0
                ? TRANSACTION_TYPE.INCOME
                : TRANSACTION_TYPE.EXPENSE;

        if (expectedType !== transactionType) {
            setTransactionType(expectedType);
        }

    }, [balanceInput.value]);

    const onChangeTransactionType = (nextType: TransactionType) => {
        setTransactionType(nextType);

        balanceInput.setValue(prev =>
            nextType === TRANSACTION_TYPE.EXPENSE
                ? -Math.abs(prev || 0)
                : Math.abs(prev || 0)
        );
    };


    const validateAndSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const iso = new Date(dateTimeInput.value);

        if (!accountInput.value) return;
        const [type, id] = accountInput.value.split(": ").map(v => v.trim());

        const ownership =
            type === ACCOUNT_TYPE.CARD
                ? {creditCardId: Number(id), walletId: undefined}
                : {walletId: Number(id), creditCardId: undefined};

        const transactionToUpsert: IUpsertTransactionRequest = {
            name: nameInput.value,
            description: descriptionInput.value,
            amount: balanceInput.value,
            createdAt: iso,
            ...ownership
        };

        setIsBtnDisabled(true);

        if (!transaction?.id)
            await onCreate(transactionToUpsert);
        else {
            if (onUpdate)
                await onUpdate(transactionToUpsert)
        }

        const form = getInitialTransactionFormState(transaction);

        nameInput.setValue(form.name);
        descriptionInput.setValue(form.description);
        balanceInput.setValue(form.amount);
        accountInput.setValue(wallet ? `${ACCOUNT_TYPE.CASH}: ${wallet.id}` : form.account);
        dateTimeInput.setValue(form.createdAt);

        setIsBtnDisabled(false);
        onClose();
    }

    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Modal.Header
                title={`${transaction ? "Edit" : "Add"} transaction`}/>

            <Modal.Content>
                <form
                    id="add-transaction-form"
                    onSubmit={validateAndSubmit}>

                    {/*Transaction switcher*/}
                    <TransactionTypeSwitcher
                        transactionType={transactionType}
                        onChange={onChangeTransactionType}/>

                    {/*Amount input*/}
                    <AmountInput
                        balance={balanceInput.value}
                        setBalance={balanceInput.setValue}/>

                    <div className="input-section__double-field">

                        {/*Name input*/}
                        <div className="input-section">
                            <FieldWithLabel
                                id="transaction-name"
                                labelText="Name"
                                placeholder="Transaction name"
                                value={nameInput.value}
                                onChange={nameInput.onChange}
                                required/>
                        </div>

                        {/*Account selector*/}
                        <div className="input-section">
                            <FieldWithIcon
                                id="account"
                                labelText="Account"
                                as="select"
                                icon={arrowDownIcon}
                                value={accountInput.value}
                                onChange={accountInput.onChange}
                                required
                            >
                                <option value="" hidden>Select account</option>
                                {wallet && (
                                    <option
                                        key={wallet.id}
                                        value={`${ACCOUNT_TYPE.CASH}: ${wallet.id}`}>
                                        Wallet
                                    </option>
                                )
                                }
                                {accounts && (
                                    accounts.map(account => {
                                            return <option
                                                key={account.id}
                                                value={`${ACCOUNT_TYPE.CARD}: ${account.id}`}>
                                                Card •••• {account.name.slice(-4)}
                                            </option>

                                        }
                                    )
                                )
                                }
                            </FieldWithIcon>
                        </div>
                    </div>

                    {/*Description input*/}
                    <div className="input-section">
                        <FieldWithLabel
                            id="description"
                            as="textarea"
                            labelText="Description"
                            placeholder="Some detail about transaction"
                            value={descriptionInput.value}
                            onChange={descriptionInput.onChange}
                        />
                    </div>
                    <div className="input-section__double-field">

                        {/*Date selector*/}
                        <div className="input-section">
                            <FieldWithIcon
                                id="date"
                                labelText="Date"
                                icon={calendarIcon}
                                type="datetime-local"
                                value={dateTimeInput.value}
                                onChange={dateTimeInput.onChange}/>
                        </div>

                        {/*Category selector*/}
                        <div className="input-section">
                            <FieldWithIcon
                                id="category"
                                labelText="Category"
                                as="select"
                                icon={arrowDownIcon}
                            >
                                <option value="" hidden>Select category</option>
                            </FieldWithIcon>
                        </div>
                    </div>
                </form>
            </Modal.Content>
            <Modal.Footer formId="add-transaction-form" isSubmitBtnDisabled={isBtnDisabled}/>
        </Modal>
    )
}

export default TransactionModal;
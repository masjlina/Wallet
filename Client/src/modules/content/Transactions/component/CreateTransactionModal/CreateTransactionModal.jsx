import Modal from "../../../../../components/modal/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";

import xIcon from "../../../../../assets/icons/x.svg";
import arrowDownIcon from "../../../../../assets/icons/arrow-down.svg";
import calendarIcon from "../../../../../assets/icons/calendar.svg";

import "./addTransactionModal.scss";
import FieldWithLabel from "../../../../../components/FieldWithLabel/FieldWithLabel";
import FieldWithIcon from "../../../../../components/FieldWithIcon/FieldWithIcon";
import Button from "../../../../../ui/Button/Button";
import AmountInput from "../../../../../components/modal/AmountInput/AmountInput";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllWalletAccounts} from "../../../Wallet/store/accountsThunks";
import accountType from "../../../../../consts/accountType";
import {getUserWallet} from "../../../Wallet/store/walletThunks";
import TransactionTypeSwitcher from "../../../../../components/modal/TransactionTypeSwitcher/TransactionTypeSwitcher";
import TRANSACTION_TYPE from "../../../../../consts/transactionTypes";
import useInput from "../../../../../hooks/useInput";
import {createTransactionFromObject} from "../../../../../domain/transaction";
import ACCOUNT_TYPE from "../../../../../consts/accountType";

const CreateTransactionModal = ({isOpen, onClose, onSubmit}) => {
    const accounts = useSelector(state => state.accounts.accounts);
    const wallet = useSelector(state => state.wallet.wallet);
    const dispatch = useDispatch();

    const nameInput = useInput("");
    const descriptionInput = useInput("");
    const balanceInput = useInput(0);
    const accountInput = useInput("");
    const dateTimeInput = useInput(
        new Date().toISOString().slice(0, 16)
    );

    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.EXPENSE);

    useEffect(() => {
        if (!accounts)
            dispatch(getAllWalletAccounts());
        if (!wallet)
            dispatch(getUserWallet());
    }, [accounts, wallet, dispatch])

    useEffect(() => {
        if (balanceInput.value > 0)
            setTransactionType(TRANSACTION_TYPE.INCOME)
        else
            setTransactionType(TRANSACTION_TYPE.EXPENSE)
    }, [balanceInput.value])

    const onChangeTransactionType = (type) => {
        setTransactionType(type);

        balanceInput.setValue(prev =>
            type === TRANSACTION_TYPE.EXPENSE
                ? -Math.abs(prev)
                : Math.abs(prev)
        );
    };

    const validateAndSubmit = async (e) => {
        e.preventDefault();

        const iso = new Date(dateTimeInput.value).toISOString();

        if (!accountInput.value) return;
        const [type, id] = accountInput.value.split(": ").map(v => v.trim());

        const ownership =
            type === ACCOUNT_TYPE.CARD
                ? { creditCardId: Number(id), walletId: null }
                : { walletId: Number(id), creditCardId: null };

        const transaction = createTransactionFromObject({
            name: nameInput.value,
            description: descriptionInput.value,
            amount: balanceInput.value,
            createdAt: iso,
            ...ownership
        });

        await onSubmit(transaction);

        nameInput.setValue("");
        descriptionInput.setValue("");
        balanceInput.setValue(0);
        accountInput.setValue("");
        dateTimeInput.setValue("");
    }


    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                className="content modal__content"
                id="add-transaction-form"
                onSubmit={validateAndSubmit}>

                <div className="content modal__content--top text__title">
                    <p>Add transaction</p>
                    <button type="button" className="modal__close pointer" onClick={onClose}>
                        <img src={xIcon} alt="Close modal" />
                    </button>

                </div>

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
                                    value={`${accountType.CASH}: ${wallet.id}`}>
                                    Wallet
                                </option>
                            )
                            }
                            {accounts && (
                                accounts.map(account => {
                                        return <option
                                            key={account.id}
                                            value={`${accountType.CARD}: ${account.id}`}>
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
                <div className="content modal__content--bottom">
                    <Button
                        className="btn__day-limit--empty"
                        type="button"
                        onClick={onClose}>Cancel</Button>
                    <Button
                        className="btn__day-limit--fill"
                        type="submit"
                        form="add-transaction-form">Save</Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateTransactionModal;
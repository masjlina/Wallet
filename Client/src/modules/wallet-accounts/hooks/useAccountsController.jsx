import {useDispatch} from "react-redux";
import {useState} from "react";
import useModal from "@/shared/hooks/useModal";

import {
    createUserWallet,
    createWalletAccount,
    getAllWalletAccounts,
    getUserWallet, getWalletAccount,
    removeWalletAccount,
    updateUserWallet,
    updateWalletAccount,
} from "@/modules/wallet-accounts";
import accountType from "@/shared/consts/accountType";
import ACCOUNT_TYPE from "@/shared/consts/accountType";
import {createAccountToUpdate} from "@/domain/creditCard";
import {createWalletToUpdate} from "@/domain/wallet";

export const useAccountsController = () => {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState(null);

    const walletModal = useModal();
    const accountModal = useModal();
    const confirmModal = useModal();

    // useEffect(() => {
    //     if (!accountModal.isOpen && !walletModal.isOpen && !confirmModal.isOpen) {
    //         setSelected(null);
    //     }
    // }, [accountModal.isOpen, walletModal.isOpen, confirmModal.isOpen]);

    const openWallet = (wallet) => {
        setSelected(wallet);
        walletModal.openModal();
    };

    const openAccount = (account) => {
        if (account !== selected && account) {
            setSelected(account);
            accountModal.openModal();
        } else
            accountModal.openModal(selected);
    };

    const openConfirm = (account) => {
        if (account !== selected && account) {
            setSelected(account);
            confirmModal.openModal();
        } else
            confirmModal.openModal(selected);
    };

    const getWallet = async () => {
        await dispatch(getUserWallet());
    }

    const getAccountById = async (id) => {
        await dispatch(getWalletAccount(id));
    }

    const getAll = async () => {
        await dispatch(getUserWallet());
        await dispatch(getAllWalletAccounts());
    }

    const create = async (type, data) => {
        if (type === accountType.CASH) {
            await dispatch(createUserWallet(data));
            walletModal.closeModal();
        } else {
            await dispatch(createWalletAccount(data));
            accountModal.closeModal();
        }
    };

    const update = async (type, data) => {
        if (type === ACCOUNT_TYPE.CASH) {
            await dispatch(updateUserWallet({
                walletId: selected.id,
                wallet: createWalletToUpdate(data)
            }));
            walletModal.closeModal();
        } else {
            await dispatch(updateWalletAccount({
                accountId: selected.id,
                account: createAccountToUpdate(data)
            }));
            accountModal.closeModal();
        }
    };

    const remove = async () => {
        await dispatch(removeWalletAccount(selected.id));
        confirmModal.closeModal();
    };

    return {
        selected,
        setSelected,
        openWallet,
        openAccount,
        openConfirm,
        getAll,
        getWallet,
        getAccountById,
        create,
        update,
        remove,
        walletModal,
        accountModal,
        confirmModal
    };
};
import {useState} from "react";
import useModal from "@/shared/hooks/useModal";

import {
    createUserWallet, createWalletCreditCard, getAllWalletCreditCards,
    getUserWallet, getWalletCreditCard, removeWalletCreditCard,
    updateUserWallet, updateWalletCreditCard,
} from "@/modules/wallet-accounts";
import {ACCOUNT_TYPE, type AccountType} from "@/shared/consts/accountType.ts";
import {type ICreditCard} from "@/domain/creditCard";
import {type IWallet} from "@/domain/wallet";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import type {IUpdateWalletRequest} from "@/modules/wallet-accounts/api/types/updateWalletRequest.ts";
import type {IUpdateCreditCardRequest} from "@/modules/wallet-accounts/api/types/updateCreditCardRequest.ts";
import type {ICreateCreditCardRequest} from "@/modules/wallet-accounts/api/types/createCreditCardRequest.ts";
import type {ICreateWalletRequest} from "@/modules/wallet-accounts/api/types/createWalletRequest.ts";

export const useAccountsController = () => {
    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState<IWallet | ICreditCard | undefined>(undefined);

    const walletModal = useModal();
    const accountModal = useModal();
    const confirmModal = useModal();

    // useEffect(() => {
    //     if (!accountModal.isOpen && !walletModal.isOpen && !confirmModal.isOpen) {
    //         setSelected(null);
    //     }
    // }, [accountModal.isOpen, walletModal.isOpen, confirmModal.isOpen]);

    const openWallet = (wallet: IWallet) => {
        setSelected(wallet);
        walletModal.openModal();
    };

    const openAccount = (account: IWallet | ICreditCard) => {
        if (account !== selected && account) {
            setSelected(account);
            accountModal.openModal();
        } else
            accountModal.openModal();
    };

    const openConfirm = (account: IWallet | ICreditCard) => {
        if (account !== selected && account) {
            setSelected(account);
            confirmModal.openModal();
        } else
            confirmModal.openModal();
    };

    const getWallet = async () => {
        await dispatch(getUserWallet());
    }

    const getCreditCardById = async (id: number) => {
        await dispatch(getWalletCreditCard(id));
    }

    const getAll = async () => {
        await dispatch(getUserWallet());
        await dispatch(getAllWalletCreditCards());
    }

    const create = async (type: AccountType, data: ICreateWalletRequest | ICreateCreditCardRequest) => {
        if (type === ACCOUNT_TYPE.CASH) {
            await dispatch(createUserWallet(data as ICreateWalletRequest));
            walletModal.closeModal();
        } else {
            await dispatch(createWalletCreditCard(data as ICreateCreditCardRequest));
            accountModal.closeModal();
        }
    };

    const update = async (type: AccountType, data: IUpdateWalletRequest | IUpdateCreditCardRequest) => {
        if (!selected)
            return;

        if (type === ACCOUNT_TYPE.CASH) {
            await dispatch(updateUserWallet({
                id: selected.id,
                wallet: data
            }));
            walletModal.closeModal();
        } else {
            await dispatch(updateWalletCreditCard({
                id: selected.id,
                creditCard: data as IUpdateCreditCardRequest
            }));
            accountModal.closeModal();
        }
    };

    const remove = async () => {
        if (!selected)
            return;

        await dispatch(removeWalletCreditCard(selected.id));
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
        getCreditCardById,
        create,
        update,
        remove,
        walletModal,
        accountModal,
        confirmModal
    };
};
import {useState} from "react";
import useModal from "@/shared/hooks/useModal";
import type {MouseEvent} from "react";
import {
    createUserTransaction,
    getAllUserTransactions,
    removeUserTransaction,
    updateUserTransaction
} from "@/modules/transactions";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import type {ITransaction} from "@/domain/transaction.ts";
import type {IUpsertTransactionRequest} from "@/modules/transactions/api/types/upsertTransactionRequest.ts";

export const useTransactionsController = () => {
    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState<ITransaction | undefined>(undefined);

    const contextModal = useModal();
    const transactionModal = useModal();
    const confirmModal = useModal();

    // useEffect(() => {
    //     if (!transactionModal.isOpen && !contextModal.isOpen && !confirmModal.isOpen) {
    //         setSelected(null);
    //     }
    // }, [transactionModal.isOpen, contextModal.isOpen, confirmModal.isOpen]);

    const openContext = (e: MouseEvent<HTMLElement>, transaction: ITransaction) => {
        setSelected(transaction);
        contextModal.openModal(e);
    };

    const openTransaction = (transaction?: ITransaction) => {
        if (transaction !== selected && transaction) {
            setSelected(transaction);
            transactionModal.openModal();
        } else
            transactionModal.openModal();
    };

    const openConfirm = () => {
        confirmModal.openModal();
    };

    const getAll = async () => {
        await dispatch(getAllUserTransactions());
    }

    const create = async (data: IUpsertTransactionRequest) => {
        await dispatch(createUserTransaction(data));
        transactionModal.closeModal();
    };

    const update = async (data: IUpsertTransactionRequest) => {
        if (!selected?.id)
            return;

        await dispatch(updateUserTransaction({
            transactionId: selected.id,
            transaction: data
        }));
        transactionModal.closeModal();
    };

    const remove = async () => {
        if (!selected?.id)
            return;

        await dispatch(removeUserTransaction(selected.id));
        confirmModal.closeModal();
    };

    return {
        selected,
        openContext,
        openTransaction,
        openConfirm,
        getAll,
        create,
        update,
        remove,
        contextModal,
        transactionModal,
        confirmModal
    };
};
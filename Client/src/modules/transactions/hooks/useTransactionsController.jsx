import {useDispatch} from "react-redux";
import {useState} from "react";
import useModal from "@/shared/hooks/useModal";

import {
    createUserTransaction,
    getAllUserTransactions,
    removeUserTransaction,
    updateUserTransaction
} from "@/modules/transactions";

export const useTransactionsController = () => {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState(null);

    const contextModal = useModal();
    const transactionModal = useModal();
    const confirmModal = useModal();

    // useEffect(() => {
    //     if (!transactionModal.isOpen && !contextModal.isOpen && !confirmModal.isOpen) {
    //         setSelected(null);
    //     }
    // }, [transactionModal.isOpen, contextModal.isOpen, confirmModal.isOpen]);

    const openContext = (e, transaction) => {
        setSelected(transaction);
        contextModal.openModal(e);
    };

    const openTransaction = (transaction) => {
        if (transaction !== selected && transaction) {
            setSelected(transaction);
            transactionModal.openModal();
        } else
            transactionModal.openModal(selected);
    };

    const openConfirm = () => {
        confirmModal.openModal();
    };

    const getAll = async () => {
        await dispatch(getAllUserTransactions());
    }

    const create = async (data) => {
        await dispatch(createUserTransaction(data));
        transactionModal.closeModal();
    };

    const update = async (data) => {
        await dispatch(updateUserTransaction({
            transactionId: selected.id,
            transaction: data
        }));
        transactionModal.closeModal();
    };

    const remove = async () => {
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
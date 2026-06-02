// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import {
    createTransaction,
    getAllTransactions,
    getTransaction,
    removeTransaction,
    updateTransaction
} from "../api/transactionsApi";
import type {IRemoveTransactionResponse} from "@/modules/transactions/api/types/removeTransactionResponse.ts";
import type {IUpsertTransactionRequest} from "@/modules/transactions/api/types/upsertTransactionRequest.ts";
import {getUserWallet} from "@/modules/wallet-accounts/store/walletThunks";
import {showNotification} from "@/app/store/notificationSlice";
import {returnRejectOrResult} from "@/app/store/returnRejectOrResult.ts";
import type {ITransaction} from "@/domain/transaction.ts";

// Shared
import {NOTIFICATION_INTENT} from "@/shared/consts/notificationIntentTypes";
import {getAllWalletCreditCards} from "@/modules/wallet-accounts";

interface IUpdateUserTransactionRequest {
    transactionId: number;
    transaction: IUpsertTransactionRequest;
}

export const getAllUserTransactions = createAsyncThunk<ITransaction[], void>(
    "transactions/getAll",
    async (_, {rejectWithValue}) => {
        const response = await getAllTransactions();

        return returnRejectOrResult<ITransaction[]>(response, rejectWithValue);
    }
);

export const getUserTransaction = createAsyncThunk<ITransaction, number>(
    "transactions/getById",
    async (transactionId, {rejectWithValue}) => {
        const response = await getTransaction(transactionId);

        return returnRejectOrResult<ITransaction>(response, rejectWithValue);
    }
);

export const createUserTransaction = createAsyncThunk<ITransaction, IUpsertTransactionRequest>(
    "transactions/create",
    async (transaction, {dispatch, rejectWithValue}) => {
        const response = await createTransaction(transaction);
        const result = returnRejectOrResult<ITransaction>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Transaction was created"
        }));

        await dispatch(getAllWalletCreditCards());
        await dispatch(getUserWallet());

        return result;
    }
);

export const updateUserTransaction = createAsyncThunk<ITransaction, IUpdateUserTransactionRequest>(
    "transactions/update",
    async ({transactionId, transaction}, {dispatch, rejectWithValue}) => {
        const response = await updateTransaction(transactionId, transaction);
        const result = returnRejectOrResult<ITransaction>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Transaction was updated"
        }));

        await dispatch(getAllWalletCreditCards());
        await dispatch(getUserWallet());

        return result;
    }
);

export const removeUserTransaction = createAsyncThunk<IRemoveTransactionResponse, number>(
    "transactions/remove",
    async (transactionId, {dispatch, rejectWithValue}) => {
        const response = await removeTransaction(transactionId);
        const result = returnRejectOrResult<IRemoveTransactionResponse>(response, rejectWithValue);

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Transaction was deleted"
        }));

        await dispatch(getAllWalletCreditCards());
        await dispatch(getUserWallet());

        return result;
    }
);

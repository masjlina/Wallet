// External libs
import {createAsyncThunk} from "@reduxjs/toolkit";

// App (modules)
import onReject from "@/app/store/onReject";
import {
    createTransaction,
    getAllTransactions,
    getTransaction,
    removeTransaction,
    updateTransaction
} from "../api/transactionsApi";
import {showNotification} from "@/app/store/notificationSlice";
import NOTIFICATION_INTENT from "@/shared/consts/notificationIntentTypes";
import {getAllWalletAccounts} from "@/modules/wallet-accounts/store/accountsThunks";
import {getUserWallet} from "@/modules/wallet-accounts/store/walletThunks";

export const getAllUserTransactions = createAsyncThunk(
    "transactions/getAll",
    async (arg, {rejectWithValue}) => {
        const response = await getAllTransactions();

        const rejected = onReject(response, rejectWithValue);
        if (rejected) return rejected;

        return response;
    }
);

export const getUserTransaction = createAsyncThunk(
    "transactions/getById",
    async (transactionId, {rejectWithValue}) => {
        const response = await getTransaction(transactionId);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) return rejected;

        return response;
    }
);

export const createUserTransaction = createAsyncThunk(
    "transactions/create",
    async (transaction, {dispatch, rejectWithValue}) => {
        const response = await createTransaction(transaction);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Transaction was not created"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Transaction was created"
        }));

        await dispatch(getAllWalletAccounts());
        await dispatch(getUserWallet());

        return response
    }
);

export const updateUserTransaction = createAsyncThunk(
    "transactions/update",
    async ({transactionId, transaction}, {dispatch, rejectWithValue}) => {
        const response = await updateTransaction(transactionId, transaction);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Transaction was not updated"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Transaction was updated"
        }));

        await dispatch(getAllWalletAccounts());
        await dispatch(getUserWallet());

        return response
    }
);

export const removeUserTransaction = createAsyncThunk(
    "transactions/remove",
    async (transactionId, {dispatch, rejectWithValue}) => {
        const response = await removeTransaction(transactionId);

        const rejected = onReject(response, rejectWithValue);
        if (rejected) {
            dispatch(showNotification({
                type: NOTIFICATION_INTENT.ERROR,
                message: "Transaction was not deleted"
            }));
            return rejected;
        }

        dispatch(showNotification({
            type: NOTIFICATION_INTENT.SUCCESS,
            message: "Transaction was deleted"
        }));

        await dispatch(getAllWalletAccounts());
        await dispatch(getUserWallet());

        return response
    }
)

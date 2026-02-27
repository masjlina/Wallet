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

export const getAllUserTransactions = createAsyncThunk(
    "transactions/getAll",
    async (arg, thunkAPI) => {
        const response = await getAllTransactions();

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
);

export const getUserTransaction = createAsyncThunk(
    "transactions/getById",
    async (transactionId, thunkAPI) => {
        const response = await getTransaction(transactionId);

        const rejected = onReject(response, thunkAPI);
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

        return response
    }
)
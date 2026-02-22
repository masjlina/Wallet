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
    async (transaction, thunkAPI) => {
        const response = await createTransaction(transaction);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response
    }
);

export const updateUserTransaction = createAsyncThunk(
    "transactions/update",
    async ({transactionId, transaction}, thunkAPI) => {
        const response = await updateTransaction(transactionId, transaction);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response
    }
);

export const removeUserTransaction = createAsyncThunk(
    "transactions/remove",
    async (transactionId, thunkAPI) => {
        const response = await removeTransaction(transactionId);

        const rejected = onReject(response, thunkAPI);
        if (rejected) return rejected;

        return response;
    }
)
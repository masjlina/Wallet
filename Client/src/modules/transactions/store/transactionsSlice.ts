// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import {
    createUserTransaction,
    getAllUserTransactions,
    getUserTransaction,
    removeUserTransaction,
    updateUserTransaction
} from "./transactionsThunks";
import type {ITransaction} from "@/domain/transaction.ts";
import type {IRemoveTransactionResponse} from "@/modules/transactions/api/types/removeTransactionResponse.ts";

interface ITransactionState {
    transactions: ITransaction[];
    transaction: ITransaction | null;
}

const initialState: ITransactionState = {
    transactions: [],
    transaction: null
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserTransactions.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
                state.transactions = action.payload;
            })
            .addCase(getUserTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                state.transaction = action.payload;
            })
            .addCase(createUserTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                state.transactions.push(action.payload);
            })
            .addCase(updateUserTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                const index = state.transactions.findIndex(
                    transaction => transaction.id === action.payload.id
                );

                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
            })
            .addCase(removeUserTransaction.fulfilled, (state, action: PayloadAction<IRemoveTransactionResponse>) => {
                const index = state.transactions.findIndex(
                    transaction => transaction.id === action.payload.transactionToDeleteId
                );

                if (index !== -1) {
                    state.transactions.splice(index, 1);
                }
            });
    }
});

export default transactionsSlice.reducer;

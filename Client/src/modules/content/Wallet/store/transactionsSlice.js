import {createSlice} from "@reduxjs/toolkit";
import {
    createUserTransaction,
    getAllUserTransactions,
    getUserTransaction,
    removeUserTransaction,
    updateUserTransaction
} from "./transactionsThunks";

const initialState = {
    transactions: [],
    transaction: null
}

const transactionsSlice = createSlice({
        name: "transactions",
        initialState: initialState,
        extraReducers: (builder) => {
            builder
                .addCase(getAllUserTransactions.fulfilled, (state, action) => {
                    state.transactions = action.payload;
                })
                .addCase(getUserTransaction.fulfilled, (state, action) => {
                    state.transaction = action.payload;
                })
                .addCase(createUserTransaction.fulfilled, (state, action) => {
                    state.transactions.push(action.payload);
                })
                .addCase(updateUserTransaction.fulfilled, (state, action) => {
                    const index = state.transactions.findIndex(
                        t => t.id === action.payload.id
                    );

                    if (index !== -1) {
                        state.transactions[index] = action.payload;
                    }
                })
                .addCase(removeUserTransaction.fulfilled, (state, action) => {
                    const index = state.transactions.findIndex(
                        t => t.id === action.payload
                    );

                    if (index !== -1) {
                        state.transactions.splice(index, 1);
                    }
                })
        }
    }
)

export default transactionsSlice.reducer;
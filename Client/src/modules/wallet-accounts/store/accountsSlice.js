// External libs
import {createSlice} from "@reduxjs/toolkit";

// App (modules)
import {
    createWalletAccount,
    getAllWalletAccounts,
    getWalletAccount,
    removeWalletAccount,
    updateWalletAccount
} from "./accountsThunks";

const initialState = {
    accounts: []
}

const accountsSlice = createSlice({
        name: "accounts",
        initialState: initialState,
        extraReducers: (builder) => {
            builder.addCase(getAllWalletAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload.accounts;
            })
            .addCase(getWalletAccount.fulfilled, (state, action) => {
                state.accounts.push(action.payload.account);
            })
            .addCase(createWalletAccount.fulfilled, (state, action) => {
                state.accounts.push(action.payload.account);
            })
            .addCase(updateWalletAccount.fulfilled, (state, action) => {
                const updatedAccount = action.payload.account;

                const index = state.accounts.findIndex(
                    acc => acc.id === updatedAccount.id
                );

                if (index !== -1) {
                    state.accounts[index] = updatedAccount;
                }
            })
            .addCase(removeWalletAccount.fulfilled, (state, action) => {
                const index = state.accounts.findIndex(
                    cc => cc.id === action.payload.accountToDeleteId
                );

                if (index !== -1) {
                    state.accounts.splice(index, 1);
                }
            })
        }
    }
)

export default accountsSlice.reducer;
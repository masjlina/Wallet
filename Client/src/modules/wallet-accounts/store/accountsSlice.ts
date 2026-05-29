// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import {
    createWalletAccount,
    getAllWalletAccounts,
    getWalletAccount,
    removeWalletAccount,
    updateWalletAccount
} from "./accountsThunks";
import type {ICreditCard} from "@/domain/account.ts";
import type {IAccountResponse} from "@/modules/wallet-accounts/api/types/accountResponse.ts";
import type {IAccountsResponse} from "@/modules/wallet-accounts/api/types/accountsResponse.ts";
import type {IRemoveAccountResponse} from "@/modules/wallet-accounts/api/types/removeAccountResponse.ts";

interface IInitialState {
    accounts: ICreditCard[]
}

const initialState: IInitialState = {
    accounts: []
};

const accountsSlice = createSlice({
    name: "accounts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllWalletAccounts.fulfilled, (state, action: PayloadAction<IAccountsResponse>) => {
                state.accounts = action.payload.accounts;
            })
            .addCase(getWalletAccount.fulfilled, (state, action: PayloadAction<IAccountResponse>) => {
                state.accounts.push(action.payload.account);
            })
            .addCase(createWalletAccount.fulfilled, (state, action: PayloadAction<IAccountResponse>) => {
                state.accounts.push(action.payload.account);
            })
            .addCase(updateWalletAccount.fulfilled, (state, action: PayloadAction<IAccountResponse>) => {
                const updatedAccount = action.payload.account;

                const index = state.accounts.findIndex(
                    account => account.id === updatedAccount.id
                );

                if (index !== -1) {
                    state.accounts[index] = updatedAccount;
                }
            })
            .addCase(removeWalletAccount.fulfilled, (state, action: PayloadAction<IRemoveAccountResponse>) => {
                const index = state.accounts.findIndex(
                    creditCard => creditCard.id === action.payload.accountToDeleteId
                );

                if (index !== -1) {
                    state.accounts.splice(index, 1);
                }
            });
    }
});

export default accountsSlice.reducer;

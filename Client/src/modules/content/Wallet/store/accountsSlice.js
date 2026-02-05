import {createSlice} from "@reduxjs/toolkit";
import {createWalletAccount, getAllWalletAccounts, removeWalletAccount} from "./accountsThunks";

const initialState = {
    accounts: null
}

const accountsSlice = createSlice({
        name: "accounts",
        initialState: initialState,
        extraReducers: (builder) => {
            builder.addCase(getAllWalletAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload.accounts;
            })
            .addCase(createWalletAccount.fulfilled, (state, action) => {
                state.accounts.push(action.payload.account) ;
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
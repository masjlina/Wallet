// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import {createUserWallet, getUserWallet, updateUserWallet} from "./walletThunks";
import type {IWallet} from "@/domain/wallet.ts";

interface IWalletState {
    wallet: IWallet | null
}

const initialState: IWalletState = {
    wallet: null
};

const walletSlice = createSlice({
    name: "wallet",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserWallet.fulfilled, (state, action: PayloadAction<IWallet>) => {
                state.wallet = action.payload;
            })
            .addCase(createUserWallet.fulfilled, (state, action: PayloadAction<IWallet>) => {
                state.wallet = action.payload;
            })
            .addCase(updateUserWallet.fulfilled, (state, action: PayloadAction<IWallet>) => {
                state.wallet = action.payload;
            });
    }
});

export default walletSlice.reducer;

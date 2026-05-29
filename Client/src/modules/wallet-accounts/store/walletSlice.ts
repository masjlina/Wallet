// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import {createUserWallet, getUserWallet, updateUserWallet} from "./walletThunks";
import type {IWallet} from "@/domain/wallet.ts";
import type {IWalletResponse} from "@/modules/wallet-accounts/api/types/walletResponse.ts";

interface IInitialState {
    wallet: IWallet | null
}

const initialState: IInitialState = {
    wallet: null
};

const walletSlice = createSlice({
    name: "wallet",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserWallet.fulfilled, (state, action: PayloadAction<IWalletResponse>) => {
                state.wallet = action.payload.wallet;
            })
            .addCase(createUserWallet.fulfilled, (state, action: PayloadAction<IWalletResponse>) => {
                state.wallet = action.payload.wallet;
            })
            .addCase(updateUserWallet.fulfilled, (state, action: PayloadAction<IWalletResponse>) => {
                state.wallet = action.payload.wallet;
            });
    }
});

export default walletSlice.reducer;

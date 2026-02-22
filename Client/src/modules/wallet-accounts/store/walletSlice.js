// External libs
import {createSlice} from "@reduxjs/toolkit";

// App (modules)
import {createUserWallet, getUserWallet, updateUserWallet} from "./walletThunks";

const initialState = {
    wallet: null
}

const walletSlice = createSlice({
        name: "wallet",
        initialState: initialState,
        extraReducers: (builder) => {
            builder.addCase(getUserWallet.fulfilled, (state, action) => {
                state.wallet = action.payload.wallet;
            })
            .addCase(createUserWallet.fulfilled, (state, action) => {
                state.wallet = action.payload.wallet;
            })
            .addCase(updateUserWallet.fulfilled, (state, action) => {
                state.wallet = action.payload.wallet;
            })
        }
    }
)

export default walletSlice.reducer;
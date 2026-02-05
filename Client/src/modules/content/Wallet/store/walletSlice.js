import {createSlice} from "@reduxjs/toolkit";
import {createUserWallet, getUserWallet} from "./walletThunks";

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
        }
    }
)

export default walletSlice.reducer;
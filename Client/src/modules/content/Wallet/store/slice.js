import {createSlice} from "@reduxjs/toolkit";
import {createUserWallet, getUserWallet} from "./thunks";

const initialState = {
    wallet: null
}

const slice = createSlice({
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

export default slice.reducer;
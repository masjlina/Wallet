import {createSlice} from "@reduxjs/toolkit";
import {getUserWallet} from "./thunks";

const initialState = {
    wallet: null
}

const slice = createSlice({
        name: "wallet",
        initialState: initialState,
        extraReducers: (builder) => {
            builder.addCase(getUserWallet.fulfilled, (state, action) => {
                state.wallet = action.payload;
            })
        }
    }
)

export default slice.reducer;
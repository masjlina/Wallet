// External libs
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

// App (modules)
import type {ICreditCard} from "@/domain/creditCard.ts";
import {
    createWalletCreditCard,
    getAllWalletCreditCards,
    getWalletCreditCard, removeWalletCreditCard, updateWalletCreditCard
} from "@/modules/wallet-accounts";
import type {IRemoveCreditCardResponse} from "@/modules/wallet-accounts/api/types/removeCreditCardResponse.ts";

interface ICreditCardState {
    creditCards: ICreditCard[]
}

const initialState: ICreditCardState = {
    creditCards: []
};

const creditCardsSlice = createSlice({
    name: "creditCards",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllWalletCreditCards.fulfilled, (state, action: PayloadAction<ICreditCard[]>) => {
            state.creditCards = action.payload;
            })
            .addCase(getWalletCreditCard.fulfilled, (state, action: PayloadAction<ICreditCard>) => {
                state.creditCards.push(action.payload);
            })
            .addCase(createWalletCreditCard.fulfilled, (state, action: PayloadAction<ICreditCard>) => {
                state.creditCards.push(action.payload);
            })
            .addCase(updateWalletCreditCard.fulfilled, (state, action: PayloadAction<ICreditCard>) => {
                const updatedCreditCard = action.payload;

                const index = state.creditCards.findIndex(
                    account => account.id === updatedCreditCard.id
                );

                if (index !== -1) {
                    state.creditCards[index] = updatedCreditCard;
                }
            })
            .addCase(removeWalletCreditCard.fulfilled, (state, action: PayloadAction<IRemoveCreditCardResponse>) => {
                const index = state.creditCards.findIndex(
                    creditCard => creditCard.id === action.payload.creditCardToDeleteId
                );

                if (index !== -1) {
                    state.creditCards.splice(index, 1);
                }
            });
    }
});

export default creditCardsSlice.reducer;

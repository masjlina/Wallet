// External libs
import {createSlice, nanoid} from "@reduxjs/toolkit";

// App (modules)

const initialState = {
    items: []
}


const notificationSlice = createSlice({
        name: "notification",
        initialState: initialState,
        reducers: {
            showNotification: {
                reducer: (state, action) => {
                    state.items.unshift(action.payload);
                },
                prepare: ({type, message}) => ({
                    payload: {
                        id: nanoid(),
                        type,
                        message,
                    }
                })
            },
            removeNotification: (state, action) => {
                state.items = state.items.filter(
                    item => item.id !== action.payload
                );
            },
        }
    }
)

export const {
    showNotification,
    removeNotification
} = notificationSlice.actions;
export default notificationSlice.reducer;
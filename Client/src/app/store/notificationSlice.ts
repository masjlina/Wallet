// External libs
import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit";
import type {NotificationIntentType} from "@/shared/consts/notificationIntentTypes.ts";

// App (modules)

export interface INotification {
    id: string;
    type: NotificationIntentType;
    message: string
}

export interface INotificationState {
    items: INotification[]
}

const initialState: INotificationState = {
    items: []
}

const notificationSlice = createSlice({
        name: "notification",
        initialState: initialState,
        reducers: {
            showNotification: {
                reducer: (state, action: PayloadAction<INotification>) => {
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
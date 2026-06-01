import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {render} from "@testing-library/react";
import {rootReducer} from "@/app/store/rootReducer";

// TODO: rewrite tests
// TODO: use custom dispatch and selector
export function createMockStore(preloadedState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}

export const withProviders = (state) => (Story) => (
    <Provider store={createMockStore(state)}>
        <BrowserRouter>
            <Story/>
        </BrowserRouter>
    </Provider>
);

export function renderWithProviders(ui, preloadedState) {
    const store = createMockStore(preloadedState);

    return {
        store,
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    {ui}
                </BrowserRouter>
            </Provider>
        )
    };
}

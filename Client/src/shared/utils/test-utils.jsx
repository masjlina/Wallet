import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@/app/store/rootReducer";

export function renderWithProviders(component, preloadedState) {
    const customStore = createMockStore(preloadedState);

    return {
        ...render(
            <Provider store={customStore}>
                <BrowserRouter>
                    {component}
                </BrowserRouter>
            </Provider>),
        store: customStore
    }
}

function createMockStore(preloadedState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}
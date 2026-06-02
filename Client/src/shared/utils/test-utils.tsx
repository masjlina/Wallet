import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {render, type RenderResult} from "@testing-library/react";
import {rootReducer, type RootState} from "@/app/store/rootReducer";
import type {ComponentType, ReactElement} from "react";

// TODO: rewrite tests
// TODO: use custom dispatch and selector
export function createMockStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState as RootState
    });
}

type MockStore = ReturnType<typeof createMockStore>;

export const withProviders = (state: Partial<RootState>) => (Story: ComponentType) => (
    <Provider store={createMockStore(state)}>
        <BrowserRouter>
            <Story/>
        </BrowserRouter>
    </Provider>
);

interface RenderWithProvidersResult extends RenderResult {
    store: MockStore;
}

export function renderWithProviders(
    ui: ReactElement,
    preloadedState?: Partial<RootState>
): RenderWithProvidersResult {
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

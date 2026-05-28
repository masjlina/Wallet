import {useState} from "react";
import type {TRANSACTION_FILTER_TYPE} from "../consts/transactionTypes.ts";

interface IPersistedStore {
    filter: TRANSACTION_FILTER_TYPE,
    isSidebarCollapsed: "true" | "false"
}

export const usePersistedState = <K extends keyof IPersistedStore>(
    key: K,
    defaultValue: IPersistedStore[K]
): [IPersistedStore[K], (newValue: IPersistedStore[K]) => void] => {
    const [value, setValue] = useState<IPersistedStore[K]>(() => {
        const stored = localStorage.getItem(key);

        if (stored !== null) {
            try {
                return JSON.parse(stored) as IPersistedStore[K];
            } catch {
                return stored as unknown as IPersistedStore[K];
            }
        }

        return defaultValue;
    });

    const setPersistedValue = (newValue: IPersistedStore[K]): void => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };

    return [value, setPersistedValue];
};
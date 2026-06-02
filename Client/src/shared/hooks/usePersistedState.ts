import { useState, type Dispatch, type SetStateAction } from "react";
import type { TransactionFilterType } from "@/shared/consts/transactionTypes.ts";

export interface IPersistedStore {
    filter: TransactionFilterType;
    isSidebarCollapsed: boolean;
    accessToken: string;
}

export const usePersistedState = <K extends keyof IPersistedStore>(
    key: K,
    defaultValue: IPersistedStore[K]
): [IPersistedStore[K], Dispatch<SetStateAction<IPersistedStore[K]>>] => {

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

    const setPersistedValue: Dispatch<SetStateAction<IPersistedStore[K]>> = (valueOrFn) => {
        setValue((prev) => {
            const nextValue = typeof valueOrFn === "function"
                ? (valueOrFn as Function)(prev)
                : valueOrFn;

            localStorage.setItem(key, JSON.stringify(nextValue));
            return nextValue;
        });
    };

    return [value, setPersistedValue];
};
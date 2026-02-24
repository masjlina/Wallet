import { useState } from "react";

export const usePersistedState = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);

        if (stored !== null) {
            try {
                return JSON.parse(stored);
            } catch {
                return stored;
            }
        }

        return defaultValue;
    });

    const setPersistedValue = (newValue) => {
        setValue(prev => {
            const valueToStore =
                typeof newValue === "function"
                    ? newValue(prev)
                    : newValue;

            localStorage.setItem(key, JSON.stringify(valueToStore));

            return valueToStore;
        });
    };

    return [value, setPersistedValue];
};
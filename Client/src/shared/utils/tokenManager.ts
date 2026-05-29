import type {PersistedStoreItemType} from "../hooks/usePersistedState.ts";

const accessTokenKey: PersistedStoreItemType = "accessToken";

export const getAccessToken = (): string | null => localStorage.getItem(accessTokenKey);

export const setAccessToken = (accessToken: string): void => {
    if (accessToken) localStorage.setItem(accessTokenKey, accessToken);
};

export const clearAccessToken = (): void => {
    localStorage.removeItem(accessTokenKey);
};

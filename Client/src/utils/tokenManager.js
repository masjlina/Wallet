const ACCESS_TOKEN = "accessToken";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setAccessToken = (accessToken) => {
    if (accessToken) localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const clearAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
};

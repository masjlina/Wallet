const serverUrl = import.meta.env.VITE_API_BASE_URL || "/api";

const endpoints = {
    serverUrl,
    register: `${serverUrl}/signUp`,
    login: `${serverUrl}/signIn`,
    logout: `${serverUrl}/logout`,
    users: `${serverUrl}/users`,
    checkAuth: `${serverUrl}/me`,
    wallet: `${serverUrl}/wallet`,
    creditCards: `${serverUrl}/credit-cards`,
    transactions: `${serverUrl}/transactions`,
    refresh: `${serverUrl}/refresh`,
};

export default endpoints;

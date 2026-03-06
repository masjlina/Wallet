const rawServerUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5231";
const serverUrl = rawServerUrl.replace(/\/+$/, "");

const endpoints = {
    serverUrl,
    register: `${serverUrl}/api/signUp`,
    login: `${serverUrl}/api/signIn`,
    logout: `${serverUrl}/api/logout`,
    users: `${serverUrl}/api/users`,
    checkAuth: `${serverUrl}/api/me`,
    wallet: `${serverUrl}/api/wallet`,
    creditCards: `${serverUrl}/api/credit-cards`,
    transactions: `${serverUrl}/api/transactions`,
    refresh: `${serverUrl}/api/refresh`,
};

export default endpoints;

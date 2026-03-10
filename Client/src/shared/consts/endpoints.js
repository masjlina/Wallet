export const serverUrl = `${import.meta.env.VITE_API_BASE_URL}/api` || "/api";

const endpoints = {
    serverUrl,
    register: `${serverUrl}/signUp`,
    login: `${serverUrl}/signIn`,
    logout: `${serverUrl}/logout`,

    users: `${serverUrl}/users`,
    avatars: `${serverUrl}/uploads/avatars`,

    checkAuth: `${serverUrl}/me`,
    refresh: `${serverUrl}/refresh`,

    wallet: `${serverUrl}/wallet`,
    creditCards: `${serverUrl}/credit-cards`,
    transactions: `${serverUrl}/transactions`,
};

export default endpoints;

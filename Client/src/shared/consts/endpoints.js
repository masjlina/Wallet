const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const SERVER_URL = API_BASE_URL ? `${API_BASE_URL}/api` : "/api";

const ENDPOINTS = {
    REGISTER: `${SERVER_URL}/sign-up`,
    LOGIN: `${SERVER_URL}/sign-in`,
    LOGOUT: `${SERVER_URL}/logout`,
    CHANGE_PASSWORD: `${SERVER_URL}/change-password`,

    USERS: `${SERVER_URL}/users`,
    AVATARS: `${SERVER_URL}/uploads/avatars`,

    CHECK_AUTH: `${SERVER_URL}/me`,
    REFRESH: `${SERVER_URL}/refresh`,

    WALLET: `${SERVER_URL}/wallet`,
    CREDIT_CARDS: `${SERVER_URL}/credit-cards`,
    TRANSACTIONS: `${SERVER_URL}/transactions`,
};

export default ENDPOINTS;

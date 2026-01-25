const serverUrl = "http://localhost:5231";

const endpoints = {
    serverUrl,
    register: `${serverUrl}/api/signUp`,
    login: `${serverUrl}/api/signIn`,
    checkAuth: `${serverUrl}/api/me`,
    wallet: `${serverUrl}/api/wallet`,
    refresh: `${serverUrl}/api/refresh`,
};

export default endpoints;

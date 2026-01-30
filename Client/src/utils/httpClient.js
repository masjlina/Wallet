import { clearAccessToken, getAccessToken, setAccessToken } from "./tokenManager";
import endpoints from "../endpoints";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export async function request(
    url,
    method = "GET",
    body = null,
    headers = {}
) {
    const accessToken = getAccessToken();

    const finalHeaders = {
        "Content-Type": "application/json",
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    let response = await fetch(url, {
        credentials: "include",
        method,
        body: body ? JSON.stringify(body) : null,
        headers: finalHeaders,
    });

    if (response.status === 401) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => {
                    return request(url, method, body, headers);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }

        isRefreshing = true;

        try {
            response = await refreshAndRepeat(url, method, body, headers);
        } catch (error) {
            // Error is already handled/thrown in refreshAndRepeat
            throw error;
        }
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const error = new Error(`Could not fetch ${url}, status: ${response.status}`);
        error.data = data;
        throw error;
    }

    return data;
}

async function refreshAndRepeat(url, method, body, headers) {
    try {
        const refreshResponse = await fetch(endpoints.refresh, {
            method: "POST",
            credentials: "include",
        });

        const refreshText = await refreshResponse.text();
        const refreshData = refreshText ? JSON.parse(refreshText) : null;

        if (!refreshResponse.ok) {
            clearAccessToken();
            const error = new Error("Refresh token expired");
            error.data = refreshData;
            processQueue(error, null);
            throw error;
        }

        const newAccessToken = refreshData.accessToken;
        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        const newHeaders = {
            "Content-Type": "application/json",
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
        };

        return fetch(url, {
            credentials: "include",
            method,
            body: body ? JSON.stringify(body) : null,
            headers: newHeaders,
        });
    } catch (error) {
        processQueue(error, null);
        throw error;
    } finally {
        isRefreshing = false;
    }
}
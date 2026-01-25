import {clearAccessToken, getAccessToken, setAccessToken} from "./tokenManager";
import endpoints from "../endpoints";

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
        response = await refreshAndRepeat(url, method, body, headers);
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
        throw error;
    }

    const newAccessToken = refreshData.accessToken;
    setAccessToken(newAccessToken);

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
}


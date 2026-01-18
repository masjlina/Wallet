import {getAccessToken} from "./tokenManager";

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

    const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: finalHeaders,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const error = new Error(`Could not fetch ${url}, status: ${response.status}`);
        error.data = data;
        throw error;
    }

    return data;
}
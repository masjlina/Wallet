import {ENDPOINTS} from "@/shared/consts/endpoints";
import {clearAccessToken, getAccessToken, setAccessToken} from "@/shared/utils/tokenManager";
import type {IRequest} from "@/shared/consts/api.ts";
import {AppError} from "@/shared/utils/AppError.ts";

interface IFailedRequest {
    resolve: (token: string | null) => void;
    reject: (error: AppError) => void;
}

interface IRefreshResponse {
    accessToken: string;
}

let isRefreshing = false;
let failedQueue: IFailedRequest[] = [];

const isJsonContentType = (contentType: string | null): boolean =>
    !!contentType && (contentType.includes("application/json") || contentType.includes("+json"));

const processQueue = (error: AppError | null, token: string | null = null): void => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export async function request<T = any>({
                                           url,
                                           method = "GET",
                                           body = null,
                                           headers = {}
                                       }: IRequest): Promise<T> {
    const accessToken = getAccessToken();
    const isFormData = body instanceof FormData;

    const finalHeaders: Record<string, string> = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    try {
        let response = await fetch(url, {
            credentials: "include",
            method,
            body: body
                ? (isFormData ? body : JSON.stringify(body))
                : null,
            headers: finalHeaders,
        });

        if (response.status === 401 &&
            url !== ENDPOINTS.LOGIN &&
            url !== ENDPOINTS.REGISTER) {

            if (isRefreshing) {
                return new Promise<string | null>((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(() => {
                        return request<T>({url, method, body, headers});
                    })
                    .catch((err) => {
                        // Здесь err уже гарантированно является AppError из processQueue
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;

            try {
                response = await refreshAndRepeat({url, method, body, headers});
            } catch (error) {
                throw error;
            }
        }

        const contentType = response.headers.get("content-type");
        let data: any = null;

        if (isJsonContentType(contentType)) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = text || null;
        }

        if (!response.ok) {
            const appError = AppError.from(data, response.status);
            appError.message = `Request failed for ${url} with status ${response.status}`;
            throw appError;
        }

        return data as T;
    } catch (networkError) {
        if (!(networkError instanceof AppError)) {
            throw AppError.from(networkError);
        }
        throw networkError;
    }
}

async function refreshAndRepeat({url, method, body, headers}: IRequest): Promise<Response> {
    try {
        const refreshResponse = await fetch(ENDPOINTS.REFRESH, {
            method: "POST",
            credentials: "include",
        });

        const refreshContentType = refreshResponse.headers.get("content-type");
        let refreshData: any = null;

        if (isJsonContentType(refreshContentType)) {
            refreshData = await refreshResponse.json();
        } else {
            const text = await refreshResponse.text();
            refreshData = text || null;
        }

        if (!refreshResponse.ok) {
            clearAccessToken();

            const appError = AppError.from(refreshData, refreshResponse.status);
            appError.message = "Refresh token expired or invalid";

            processQueue(appError, null);
            throw appError;
        }

        const typedRefreshData = refreshData as IRefreshResponse;
        const newAccessToken: string = typedRefreshData.accessToken;

        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        const isFormData = body instanceof FormData;

        const newHeaders: Record<string, string> = {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
        };

        return fetch(url, {
            credentials: "include",
            method,
            body: body
                ? (isFormData ? body : JSON.stringify(body))
                : null,
            headers: newHeaders,
        });
    } catch (error) {
        const appError = error instanceof AppError ? error : AppError.from(error);
        processQueue(appError, null);
        throw appError;
    } finally {
        isRefreshing = false;
    }
}
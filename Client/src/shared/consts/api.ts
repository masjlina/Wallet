export interface IRequest<T = Record<string, any>> {
    url: string;
    method: MethodType;
    body?: FormData | T | null;
    headers?: {
        "Content-Type"?: "application/json" | "multipart/form-data",
        "Authorization"?: string
    };
}

export type MethodType = "GET" | "POST" | "DELETE" | "PATCH";
export interface IRequest {
    url: string;
    method: MethodType;
    body?: FormData | string | null;
    headers?: {
        "Content-Type"?: "application/json" | "multipart/form-data",
        "Authorization"?: string
    };
}

export type MethodType = "GET" | "POST" | "DELETE" | "PATCH";
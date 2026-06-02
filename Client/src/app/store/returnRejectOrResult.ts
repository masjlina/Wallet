import {AppError} from "@/shared/utils/AppError.ts";

export interface ISerializedAppError {
    name: string;
    message: string;
    messages: string[];
    status?: number;
}

export function returnRejectOrResult<T>(
    response: AppError | T,
    rejectWithValue: (value: ISerializedAppError) => any
): T {
    if (response instanceof AppError) {
        return rejectWithValue(response.toPlainObject());
    }

    if (response && typeof response === "object" && "errors" in response) {
        const appError = AppError.from(response);
        return rejectWithValue(appError.toPlainObject());
    }

    return response;
}

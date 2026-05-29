import {AppError} from "@/shared/utils/AppError.ts";

export function returnRejectOrResult<T>(
    response: AppError | T,
    rejectWithValue: (value: AppError) => any
): T {
    if (response instanceof AppError) {
        return rejectWithValue(response) as any;
    }

    return response;
}

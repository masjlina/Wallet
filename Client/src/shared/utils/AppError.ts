import type {IErrorResponse} from "@/shared/api/errorResponse.ts";
import type {ISerializedAppError} from "@/app/store/returnRejectOrResult.ts";

export class AppError extends Error {
    public readonly messages: string[];
    public readonly status?: number;

    constructor(message: string, messages: string[] = [], status?: number) {
        super(message);
        this.name = "AppError";
        this.status = status;

        this.messages = messages.length > 0 ? messages : [message];
        Object.setPrototypeOf(this, AppError.prototype);
    }

    toPlainObject(): ISerializedAppError {
        return {
            name: this.name,
            message: this.message,
            messages: this.messages,
            status: this.status
        };
    }

    static from(error: unknown, status?: number): AppError {
        // Check if it's an error from the server
        if (error && typeof error === "object" && "errors" in error) {
            const serverResponse = error as IErrorResponse;
            if (Array.isArray(serverResponse.errors)) {
                return new AppError(
                    serverResponse.errors[0] || "Server Error",
                    serverResponse.errors,
                    status
                )
            }
        }

        // Check if it's a base error
        if (error instanceof Error) {
            return new AppError(error.message, [error.message], status);
        }

        // Check if the string is incorrect
        if (typeof error === "string") {
            return new AppError(error, [error], status);
        }

        return new AppError("unknown error occured", [], status);
    }
}
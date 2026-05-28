interface IErrorResponse {
    data: {
        errors: string[]
    },
    message?: string
}

export default function createErrorResponse(error: IErrorResponse) {
    return {
        errors: error?.data?.errors ?? [error?.message ?? "Unknown error"]
    }
}
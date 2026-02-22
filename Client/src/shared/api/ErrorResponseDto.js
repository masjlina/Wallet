export default function createErrorResponseDto (error) {
    return {
        errors: error?.data?.errors ?? [error?.message ?? "Unknown error"]
    }
}
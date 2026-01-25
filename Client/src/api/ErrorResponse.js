export default function createErrorResponse (error) {
    return {
        errors: error?.data?.errors ?? [error?.message ?? "Unknown error"]
    }
}
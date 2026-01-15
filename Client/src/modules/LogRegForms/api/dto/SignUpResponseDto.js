export default function createSignUpResponseDto ({isSuccessful, errors}) {
    return {
        isSuccessful: isSuccessful,
        errors: errors
    };
}
export default function createSignUpResponseDto ({isRegistrationSuccessful, errors}) {
    return {
        isRegistrationSuccessful: isRegistrationSuccessful,
        errors: errors
    };
}
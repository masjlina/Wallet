export default function createSignInResponseDto ({isRegistrationSuccessful, errors, accessToken, refreshToken, applicationUserDto}) {
    return {
        isRegistrationSuccessful: isRegistrationSuccessful,
        errors: errors,
        accessToken: accessToken,
        refreshToken: refreshToken,
        applicationUserDto: applicationUserDto
    };
}
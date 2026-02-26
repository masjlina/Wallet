export default function createSignInResponseDto ({accessToken, applicationUserDto}) {
    return {
        accessToken: accessToken,
        user: applicationUserDto
    };
}
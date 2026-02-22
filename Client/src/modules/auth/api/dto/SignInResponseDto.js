export default function createSignInResponseDto ({accessToken, applicationUserDTO}) {
    return {
        accessToken: accessToken,
        user: applicationUserDTO
    };
}
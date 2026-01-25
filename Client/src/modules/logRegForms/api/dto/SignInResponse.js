export default function createSignInResponse ({accessToken, applicationUserDTO}) {
    return {
        accessToken: accessToken,
        user: applicationUserDTO
    };
}
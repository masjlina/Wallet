export default function createSignInResponseDto ({isSuccessful, errors, applicationUserDTO = {}}) {
    return {
        isSuccessful: isSuccessful,
        errors: errors,
        user: {
            id: applicationUserDTO.id,
            email: applicationUserDTO.email,
            firstName: applicationUserDTO.firstName,
            lastName: applicationUserDTO.lastName,
            avatarUri: applicationUserDTO.avatarUri
        }
    };
}
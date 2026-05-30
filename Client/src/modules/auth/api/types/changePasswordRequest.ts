export interface IChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export default function createChangePasswordDto ({oldPassword, newPassword, confirmPassword}) {
    return {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    };
}
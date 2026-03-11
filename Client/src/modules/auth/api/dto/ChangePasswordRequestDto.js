export default function createChangePasswordDto ({oldPassword, newPassword, confirmPassword}) {
    return {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    };
}
export default function createSignUpRequestDto ({firstName, lastName, email, password, confirmPassword, rememberMe}) {
    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        rememberMe: rememberMe === "on" ? true : false
    };
}
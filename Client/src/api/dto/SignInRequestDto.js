export default function createSignInRequestDto ({email, password}) {
    return {
        email: email,
        password: password
    };
}
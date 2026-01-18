import rememberMe from "../../LoginForm/components/RememberMe/RememberMe";

export default function createSignInRequestDto ({email, password, rememberMe}) {
    return {
        email: email,
        password: password,
        rememberMe: rememberMe
    };
}
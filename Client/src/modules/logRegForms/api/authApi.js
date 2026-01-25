import endpoints from "../../../endpoints";

import {request} from "../../../utils/httpClient";
import {clearAccessToken, setAccessToken} from "../../../utils/tokenManager";

import createErrorResponse from "../../../api/ErrorResponse";
import createSuccessfulResponse from "../../../api/SuccessfulResponse";
import createSignUpRequestDto from "./dto/SignUpRequestDto";
import createSignInRequestDto from "./dto/SignInRequestDto";
import createSignInResponse from "./dto/SignInResponse";
import createCheckAuthResponse from "./dto/CheckAuhtResponse";

export async function register(formData) {
    try {
        const signUpRequest = createSignUpRequestDto(formData);

        await request(endpoints.register, "POST", signUpRequest);

        return createSuccessfulResponse();
    } catch (error) {
        return createErrorResponse(error);
    }
}

export async function login(formData) {
    try {
        clearAccessToken();

        const signInRequest = createSignInRequestDto(formData);

        const result = await request(endpoints.login, "POST", signInRequest);

        setAccessToken({
            accessToken: result.accessToken,
        });

        return createSignInResponse(result);
    } catch (error) {
        return createErrorResponse(error);
    }
}

export async function checkAuth() {
    try {
        const result = await request(endpoints.checkAuth);

        return createCheckAuthResponse(result);
    } catch (error) {
        return createErrorResponse(error);
    }
}

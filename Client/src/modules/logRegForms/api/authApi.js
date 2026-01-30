import endpoints from "../../../endpoints";

import {request} from "../../../utils/httpClient";
import {clearAccessToken, setAccessToken} from "../../../utils/tokenManager";

import createErrorResponseDto from "../../../api/ErrorResponseDto";
import createSuccessfulResponseDto from "../../../api/SuccessfulResponseDto";
import createSignUpRequestDto from "./dto/SignUpRequestDto";
import createSignInRequestDto from "./dto/SignInRequestDto";
import createSignInResponseDto from "./dto/SignInResponseDto";
import createCheckAuthResponse from "./dto/CheckAuthResponseDto";

export async function register(formData) {
    try {
        const signUpRequest = createSignUpRequestDto(formData);

        await request(endpoints.register, "POST", signUpRequest);

        return createSuccessfulResponseDto();
    } catch (error) {
        return createErrorResponseDto(error);
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

        return createSignInResponseDto(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function checkAuth() {
    try {
        const result = await request(endpoints.checkAuth);

        return createCheckAuthResponse(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

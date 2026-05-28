// App (modules)
import createCheckAuthResponse from "@/modules/auth/api/dto/CheckAuthResponseDto";
import createSignInRequestDto from "@/modules/auth/api/dto/SignInRequestDto";
import createSignInResponseDto from "@/modules/auth/api/dto/SignInResponseDto";
import createSignUpRequestDto from "@/modules/auth/api/dto/SignUpRequestDto";

// Shared
import createErrorResponseDto from "@/shared/api/errorResponse";
import createSuccessfulResponseDto from "@/shared/api/successfulResponse";
import ENDPOINTS from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {clearAccessToken, setAccessToken} from "@/shared/utils/tokenManager";

export async function register(formData) {
    try {
        clearAccessToken();

        const signUpRequest = createSignUpRequestDto(formData);

        await request(ENDPOINTS.REGISTER, "POST", signUpRequest);

        return createSuccessfulResponseDto();
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function login(formData) {
    try {
        clearAccessToken();

        const signInRequest = createSignInRequestDto(formData);

        const result = await request(ENDPOINTS.LOGIN, "POST", signInRequest);

        setAccessToken(result.accessToken);

        return createSignInResponseDto(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function logout() {
    try {
        await request(ENDPOINTS.LOGOUT, "POST");

        return createSuccessfulResponseDto();
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function checkAuth() {
    try {
        const result = await request(ENDPOINTS.CHECK_AUTH);

        return createCheckAuthResponse(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function changePassword(data) {
    try {
        await request(ENDPOINTS.CHANGE_PASSWORD, "POST", data);

        return createSuccessfulResponseDto();
    } catch (error) {
        return createErrorResponseDto(error);
    }
}


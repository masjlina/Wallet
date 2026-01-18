import appSettings from "../../../appSettings";

import {request} from "../../../utils/httpClient";
import {clearTokens, setTokens} from "../../../utils/tokenManager";

import createSignUpRequestDto from "./dto/SignUpRequestDto";
import createSignUpResponseDto from "./dto/SignUpResponseDto";
import createSignInRequestDto from "./dto/SignInRequestDto";
import createSignInResponseDto from "./dto/SignInResponseDto";

export async function register(formData) {
    try {
        const signUpRequest = createSignUpRequestDto(formData);

        await request(appSettings.registerEndpoint, "POST", signUpRequest);

        return createSignUpResponseDto({
            isSuccessful: true,
            errors: [],
        });
    } catch (error) {
        const errors = error?.data?.errors ?? [error?.message ?? "Unknown error"];

        return createSignUpResponseDto({
            isSuccessful: false,
            errors,
        });
    }
}

export async function login(formData) {
    try {
        clearTokens();

        const signInRequest = createSignInRequestDto(formData);

        const result = await request(appSettings.loginEndpoint, "POST", signInRequest);

        setTokens({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });

        return createSignInResponseDto(result);
    } catch (error) {
        const errors = error?.data?.errors ?? [error?.message ?? "Unknown error"];

        return createSignInResponseDto({
            isSuccessful: false,
            errors,
        });
    }
}

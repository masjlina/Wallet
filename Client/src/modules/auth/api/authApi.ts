// App (modules)
import {type ICheckAuthResponse} from "@/modules/auth/api/types/checkAuthResponse.ts";
import {type ISignInRequest} from "@/modules/auth/api/types/signInRequest.ts";
import {type ISignInResponse} from "@/modules/auth/api/types/signInResponse.ts";

// Shared
import {type ISuccessfulResponse, SUCCESSFUL_RESPONSE} from "@/shared/api/successfulResponse";
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {clearAccessToken, setAccessToken} from "@/shared/utils/tokenManager";
import type {IUser} from "@/domain/user.ts";
import {AppError} from "@/shared/utils/AppError.ts";
import type {IChangePasswordRequest} from "@/modules/auth/api/types/changePasswordRequest.ts";
import type {ISignUpRequest} from "@/modules/auth/api/types/signUpRequest.ts";

type ReturnType<T extends ISuccessfulResponse |
    ISignInResponse> = Promise<T | AppError>;

export async function register(data: ISignUpRequest): ReturnType<ISuccessfulResponse> {
    try {
        clearAccessToken();

        await request({
            url: ENDPOINTS.REGISTER,
            method: "POST",
            body: data
        });

        return SUCCESSFUL_RESPONSE;
    } catch (error) {
        return AppError.from(error)
    }
}

export async function login(data: ISignInRequest): ReturnType<ISignInResponse> {
    try {
        clearAccessToken();

        const result: ISignInResponse = await request({
            url: ENDPOINTS.LOGIN,
            method: "POST",
            body: data
        });

        setAccessToken(result.accessToken);

        return result;
    } catch (error) {
        return AppError.from(error)
    }
}

export async function logout(): ReturnType<ISuccessfulResponse> {
    try {
        await request({
            url: ENDPOINTS.LOGOUT,
            method: "POST"
        });

        return SUCCESSFUL_RESPONSE;
    } catch (error) {
        return AppError.from(error)
    }
}

export async function checkAuth(): Promise<ICheckAuthResponse | AppError> {
    try {
        const response: IUser = await request({
            url: ENDPOINTS.CHECK_AUTH,
            method: "GET"
        });

        return {user: response} as ICheckAuthResponse;
    } catch (error) {
        return AppError.from(error)
    }
}

export async function changePassword(data: IChangePasswordRequest): ReturnType<ISuccessfulResponse> {
    try {
        await request({
            url: ENDPOINTS.CHANGE_PASSWORD,
            method: "POST",
            body: data
        });

        return SUCCESSFUL_RESPONSE;
    } catch (error) {
        return AppError.from(error)
    }
}


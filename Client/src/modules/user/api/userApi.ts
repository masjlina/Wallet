// App (modules)
import {type IUser} from "@/domain/user.ts";
import type {IUpdateUserRequest} from "@/modules/user/api/types/updateUserRequest.ts";

// Shared
import {type ISuccessfulResponse, SUCCESSFUL_RESPONSE} from "@/shared/api/successfulResponse.ts";
import {ENDPOINTS} from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";
import {AppError} from "@/shared/utils/AppError.ts";

type ReturnType<T extends IUser | ISuccessfulResponse> = Promise<T | AppError>;

export async function getUser(): ReturnType<IUser> {
    try {
        const result = await request<IUser>({
            url: ENDPOINTS.USERS,
            method: "GET"
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function updateUser(data: IUpdateUserRequest): ReturnType<IUser> {
    try {
        const result = await request<IUser>({
            url: ENDPOINTS.USERS,
            method: "PATCH",
            body: data
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function uploadAvatar(data: FormData): ReturnType<IUser> {
    try {
        const result = await request<IUser>({
            url: ENDPOINTS.AVATARS,
            method: "POST",
            body: data
        });

        return result;
    } catch (error) {
        return AppError.from(error);
    }
}

export async function removeAvatar(): ReturnType<ISuccessfulResponse> {
    try {
        await request({
            url: ENDPOINTS.AVATARS,
            method: "DELETE"
        });

        return SUCCESSFUL_RESPONSE;
    } catch (error) {
        return AppError.from(error);
    }
}

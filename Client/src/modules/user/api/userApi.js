// App (modules)
import mapUser from "@/domain/user";

// Shared
import createErrorResponseDto from "@/shared/api/ErrorResponseDto";
import ENDPOINTS from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";

export async function getUser() {
    try {
        const result = await request(`${ENDPOINTS.USERS}`, "GET");

        return mapUser(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function updateUser(user) {
    try {
        const result = await request(`${ENDPOINTS.USERS}`, "PATCH", user);

        return mapUser(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
export async function uploadAvatar(formData) {
    try {
        const result = await request(
            ENDPOINTS.AVATARS,
            "POST",
            formData
        );

        return mapUser(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function removeAvatar() {
    try {
        await request(
            ENDPOINTS.AVATARS,
            "DELETE"
        );

        return true;
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

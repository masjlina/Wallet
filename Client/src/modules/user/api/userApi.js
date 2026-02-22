// App (modules)
import mapUser from "@/domain/user";

// Shared
import createErrorResponseDto from "@/shared/api/ErrorResponseDto";
import endpoints from "@/shared/consts/endpoints";
import {request} from "@/shared/utils/httpClient";

export async function getUser() {
    try {
        const result = await request(`${endpoints.users}`, "GET");

        return mapUser(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}

export async function updateUser(user) {
    try {
        const result = await request(`${endpoints.users}`, "PATCH", user);

        return mapUser(result);
    } catch (error) {
        return createErrorResponseDto(error);
    }
}
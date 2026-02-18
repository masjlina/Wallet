import {request} from "../../../../utils/httpClient";
import endpoints from "../../../../endpoints";
import createErrorResponseDto from "../../../../api/ErrorResponseDto";
import mapUser from "../../../../domain/user";

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
import {request} from "../../../../utils/httpClient";
import endpoints from "../../../../endpoints";
import createErrorResponse from "../../../../api/ErrorResponse";
import createSuccessfulResponse from "../../../../api/SuccessfulResponse";

export async function getWallet() {
    try {
        const result =  await request(endpoints.wallet);

        return createSuccessfulResponse(result);
    } catch (error) {
        createErrorResponse(error);
    }
}
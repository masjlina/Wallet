import appSettings from "../../appSettings";
import createSignUpRequestDto from "./dto/SignUpRequestDto";
import createSignUpResponseDto from "./dto/SignUpResponseDto";

export async function registerUser(formData) {
    try {
        const dto = createSignUpRequestDto(formData);
        const response = await fetch(appSettings.registerEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto)
        });

        if (!response.ok) {
            const content = await response.json();
            return createSignUpResponseDto({
                isRegistrationSuccessful: false,
                errors: content.errors || []
            });
        }

        return createSignUpResponseDto({
            isRegistrationSuccessful: true,
            errors: []
        });

    } catch (error) {
        return createSignUpResponseDto({
            isRegistrationSuccessful: false,
            errors: [error.message]
        });
    }
}

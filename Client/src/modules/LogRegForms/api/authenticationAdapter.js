import appSettings from "../../../appSettings";
import createSignUpRequestDto from "./dto/SignUpRequestDto";
import createSignUpResponseDto from "./dto/SignUpResponseDto";
import createSignInRequestDto from "./dto/SignInRequestDto";
import createSignInResponseDto from "./dto/SignInResponseDto";

export async function register(formData) {
    try {
        const signUpRequest = createSignUpRequestDto(formData);
        const response = await fetch(appSettings.registerEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpRequest)
        });

        if (!response.ok) {
            const result = await response.json();
            return createSignUpResponseDto({
                isSuccessful: false,
                errors: result.errors || []
            });
        }

        return createSignUpResponseDto({
            isSuccessful: true,
            errors: []
        });

    } catch (error) {
        return createSignUpResponseDto({
            isSuccessful: false,
            errors: [error.message]
        });
    }
}

export async function login(formData) {
    try {
        const signInRequest = createSignInRequestDto(formData);
        
        const response = await fetch(appSettings.loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signInRequest)
        });

        const result = await response.json();
        
        if (!response.ok) {
            return createSignInResponseDto({
                isSuccessful: false,
                errors: result.errors || []
            });
        }

        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        return createSignInResponseDto(result);
    }  catch (error) {
        return createSignInResponseDto({
            isSuccessful: false,
            errors: [error.message]
        });
    }
    
}

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
                isRegistrationSuccessful: false,
                errors: result.errors || []
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
                isRegistrationSuccessful: false,
                errors: result.errors || []
            });
        }

        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        
        return createSignInResponseDto({
            isRegistrationSuccessful: true,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            applicationUserDto: result.applicationUserDto,
            errors: []
        });
    }  catch (error) {
        return createSignInResponseDto({
            isRegistrationSuccessful: false,
            errors: [error.message]
        });
    }
    
}

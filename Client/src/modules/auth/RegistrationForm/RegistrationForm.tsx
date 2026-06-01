// React
import {type ChangeEvent, useEffect} from "react";

// External libs
import {Link, useNavigate} from "react-router-dom";

// App (modules)
import AuthLayout from "../components/AuthLayout/AuthLayout";
import EmailField from "../components/EmailField/EmailField";
import FirstNameField from "../components/FirstNameField/FirstNameField";
import LastNameField from "../components/LastNameField/LastNameField";
import PasswordField from "../components/PasswordField/PasswordField";
import {clearErrors, registerUser} from "@/modules/auth";

// Shared
import {ROUTES} from "@/shared/consts/routes";
import STATUSES from "@/shared/consts/statuses";
import useInput from "@/shared/hooks/useInput";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "../style.scss";
import ErrorText from "@/shared/components/ErrorText";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";
import type {ISignUpRequest} from "@/modules/auth/api/types/signUpRequest.ts";

export const RegistrationForm = () => {
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const password = useInput("");
    const passwordConfirmation = useInput("");

    const dispatch = useAppDispatch();
    const regStatus = useAppSelector((state) => state.auth.status);
    const regErrors = useAppSelector((state) => state.auth.errors);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearErrors());
    }, [])

    const onCreateAccount = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: ISignUpRequest = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            confirmPassword: passwordConfirmation.value,
        }

        await dispatch(registerUser(formData));
        navigate(ROUTES.LOGIN);
    }

    return (
        <AuthLayout>
            <form
                className="input-section"
                action="#"
                method="post"
                onSubmit={onCreateAccount}>
                <div className="input-section__fields">
                    <div className="input-section__double-field">
                        <FirstNameField value={firstName.value} onChange={firstName.onChange}/>
                        <LastNameField value={lastName.value} onChange={lastName.onChange}/>
                    </div>

                    <EmailField
                        value={email.value}
                        onChange={email.onChange}/>

                    <PasswordField
                        id="password-input"
                        value={password.value}
                        onChange={password.onChange}/>
                    <PasswordField
                        id="password-confirm-input"
                        value={passwordConfirmation.value}
                        name="confirmPassword"
                        labelText="Confirm Password"
                        placeholder="Confirm your password"
                        onChange={passwordConfirmation.onChange}
                    />

                    {/* Checkbox and Submit */}
                    <div className="log-reg__actions">
                        <Button
                            className="log-reg__btn"
                            type="submit"
                            disabled={regStatus === STATUSES.LOADING}
                        >
                            Create account
                        </Button>
                    </div>
                    {regErrors.length > 0 &&
                       <ErrorText errors={regErrors}/> }
                </div>
            </form>

            {/* Another option */}
            <div className="log-reg__alternative">
                <div className="log-reg__alternative-or">
                    <p className="log-reg__alternative-text">or sign in</p>
                </div>

                <Link to={ROUTES.LOGIN} className="log-reg__alternative-ref">
                    Login
                </Link>
            </div>
        </AuthLayout>
    );
};

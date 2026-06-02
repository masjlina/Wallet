// React
// External libs
import {Link, useNavigate} from "react-router-dom";

// App (modules)
import AuthLayout from "../components/AuthLayout/AuthLayout";
import EmailField from "../components/EmailField/EmailField";
import PasswordField from "../components/PasswordField/PasswordField";
import RememberMe from "./components/RememberMe/RememberMe";
import {loginUser} from "@/modules/auth";

// Shared
import {ROUTES} from "@/shared/consts/routes";
import STATUSES from "@/shared/consts/statuses";
import useInput from "@/shared/hooks/useInput";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "../style.scss";
import {type ChangeEvent, useState} from "react";
import ErrorText from "@/shared/components/ErrorText";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";
import type {ISignInRequest} from "@/modules/auth/api/types/signInRequest.ts";

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logStatus = useAppSelector((state) => state.auth.status);
    const logErrors = useAppSelector((state) => state.auth.errors);

    const email = useInput("");
    const password = useInput("");
    const isRemembered = useInput(false);

    const [isSubmit, setIsSubmit] = useState(false);

    const onLogin = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmit(true);

        const formData: ISignInRequest = {
            email: email.value,
            password: password.value,
            rememberMe: isRemembered.value
        };

        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate(ROUTES.DASHBOARD);
        } catch {
            // Errors are stored in auth state by the rejected thunk and rendered below.
        }
    };

    return (
        <AuthLayout>
            <form
                className="input-section"
                action="#"
                method="post"
                onSubmit={onLogin}>
                <div className="input-section__fields">
                    <EmailField
                        value={email.value}
                        onChange={email.onChange}/>

                    <PasswordField
                        value={password.value}
                        onChange={password.onChange}/>

                    {/* Checkbox and Submit */}
                    <div className="log-reg__actions">
                        <RememberMe
                            checked={isRemembered.value}
                            onChange={isRemembered.onChange}/>

                        <Button
                            className="log-reg__btn"
                            type="submit"
                            disabled={logStatus === STATUSES.LOADING}
                        >
                            Login
                        </Button>
                    </div>
                    {isSubmit && logErrors.length > 0 && (
                        <ErrorText errors={logErrors}/>
                    )}
                </div>
            </form>

            {/* Another option */}
            <div className="log-reg__alternative">
                <div className="log-reg__alternative-or">
                    <p className="log-reg__alternative-text">or sign up</p>
                </div>

                <Link to={ROUTES.REGISTRATION} className="log-reg__alternative-ref">
                    Create an account
                </Link>
            </div>
        </AuthLayout>
    );
};

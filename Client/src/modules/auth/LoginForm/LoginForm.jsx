// React
import {useEffect} from "react";

// External libs
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

// App (modules)
import AuthLayout from "../components/AuthLayout/AuthLayout";
import EmailField from "../components/EmailField/EmailField";
import PasswordField from "../components/PasswordField/PasswordField";
import RememberMe from "./components/RememberMe/RememberMe";
import {clearErrors} from "@/modules/auth";
import {loginUser} from "@/modules/auth";

// Shared
import {ROUTES} from "@/shared/consts/routes";
import STATUSES from "@/shared/consts/statuses";
import useInput from "@/shared/hooks/useInput";

// UI
import Button from "@/ui/Button/Button";

// Styles
import "../style.scss";

export const LoginForm = () => {
    const email = useInput("");
    const password = useInput("");
    const isRemembered = useInput(false);

    const logStatus = useSelector((state) => state.auth.status);
    const logErrors = useSelector((state) => state.auth.errors);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrors());
    }, [])

    const onLogin = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        formData.rememberMe = !! isRemembered;

        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
        }
    }

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
                    {logErrors.length > 0 &&
                        logErrors.map((error, i) => (
                            <p key={i} style={{color: "red"}}>
                                {error}
                            </p>
                        ))}
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

import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import PasswordField from "../../../components/PasswordField/PasswordField";
import Button from "../../../../../ui/Button/Button";
import FirstNameField from "../../../components/FirstNameField/FirstNameField";
import LastNameField from "../../../components/LastNameField/LastNameField";
import EmailField from "../../../components/EmailField/EmailField";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";

import {registerUser} from "../../../store/thunks";
import status from "../../../../../consts/status";
import useInput from "../../../../../hooks/useInput";
import {clearErrors} from "../../../store/slice";

import "../../../style.scss";
import {ROUTES} from "../../../../../consts/routes";

export const RegistrationForm = () => {
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const password = useInput("");
    const passwordConfirmation = useInput("");

    const dispatch = useDispatch();
    const regStatus = useSelector((state) => state.auth.status);
    const regErrors = useSelector((state) => state.auth.errors);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearErrors());
    }, [])

    const onCreateAccount = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

        try {
            await dispatch(registerUser(formData)).unwrap();
            navigate(ROUTES.LOGIN);
        } catch (err) {
        }
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
                            disabled={regStatus === status.LOADING}
                        >
                            Create account
                        </Button>
                    </div>
                    {regErrors.length > 0 &&
                        regErrors.map((error, i) => (
                            <p key={i} style={{color: "red"}}>
                                {error}
                            </p>
                        ))}
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

import {Link} from "react-router-dom";
import {useState} from "react";

import PasswordField from "../../../components/PasswordField/PasswordField";
import Button from "../../../../../ui/Button/Button";
import FirstNameField from "../../../components/FirstNameField/FirstNameField";
import LastNameField from "../../../components/LastNameField/LastNameField";
import EmailField from "../../../components/EmailField/EmailField";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";
import RememberMe from "../../../components/RememberMe/RememberMe";

import "../../../style.scss";
import {useDispatch} from "react-redux";
import {registerUser} from "../../../store/thunks";

export const RegistrationForm = () => {
    const [regErrors, setRegErrors] = useState([]);

    const [firstNameState, setFirstName] = useState("");
    const [lastNameState, setLastName] = useState("");
    const [emailState, setEmail] = useState("");
    const [passwordState, setPassword] = useState("");
    const [passwordConfirmationState, setPasswordConfirmation] = useState("");

    const dispatch = useDispatch();

    const onValueChange = (setState, e) => {
        setState(e.target.value)
    }

    const onCreateAccount = async (e) => {
        e.preventDefault();
        setRegErrors([]);

        const formData = new FormData(e.currentTarget);

        const response = await dispatch(registerUser(Object.fromEntries(formData.entries()))).unwrap();
        if (!response.isRegistrationSuccessful) setRegErrors(response.errors);
    }

    return (
        <AuthLayout>
            <form className="input-section" action="#" method="post" onSubmit={(e) => onCreateAccount(e)}>
                <div className="input-section__fields">
                    <div className="input-section__double-field">
                        <FirstNameField value={firstNameState} onChange={(e) => onValueChange(setFirstName, e)}/>
                        <LastNameField value={lastNameState} onChange={(e) => onValueChange(setLastName, e)}/>
                    </div>

                    <EmailField value={emailState} onChange={(e) => onValueChange(setEmail, e)}/>

                    <PasswordField value={passwordState} onChange={(e) => onValueChange(setPassword, e)}/>
                    <PasswordField
                        id="password-confirm-input"
                        value={passwordConfirmationState}
                        name="confirmPassword"
                        labelText="Confirm Password"
                        placeholder="Confirm your password"
                        onChange={(e) => onValueChange(setPasswordConfirmation, e)}
                    />

                    {/* Checkbox and Submit */}
                    <div className="log-reg__actions">
                       <RememberMe/>

                        <Button
                            className="log-reg__btn"
                            type="submit"
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

                <Link to="/login" className="log-reg__alternative-ref">
                    Login
                </Link>
            </div>
        </AuthLayout>
    );
};

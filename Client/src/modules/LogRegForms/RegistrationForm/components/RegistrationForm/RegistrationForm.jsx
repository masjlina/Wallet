import {Link} from "react-router-dom";
import PasswordField from "../../../components/PasswordField/PasswordField";
import Button from "../../../../../ui/Button/Button";
import FirstNameField from "../../../components/FirstNameField/FirstNameField";
import LastNameField from "../../../components/LastNameField/LastNameField";
import EmailField from "../../../components/EmailField/EmailField";

import "../../../style.scss";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";
import RememberMe from "../../../components/RememberMe/RememberMe";

export const RegistrationForm = () => {
    return (
        <AuthLayout>
            <form className="input-section" action="#" method="post">
                <div className="input-section__fields">
                    <div className="input-section__double-field">
                        <FirstNameField/>
                        <LastNameField/>
                    </div>

                    <EmailField/>

                    <PasswordField/>
                    <PasswordField
                        id="password-confirm-input"
                        name="confirmPassword"
                        labelText="Confirm Password"
                        placeholder="Confirm your password"/>

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

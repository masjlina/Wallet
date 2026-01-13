import {Link} from "react-router-dom";
import PasswordField from "../../../components/PasswordField/PasswordField";
import EmailField from "../../../components/EmailField/EmailField";
import Button from "../../../../../ui/Button/Button";

import "../../../style.scss";
import AuthLayout from "../../../components/AuthLayout/AuthLayout";
import RememberMe from "../../../components/RememberMe/RememberMe";

export const LoginForm = () => {
    return (
        <AuthLayout>
            <form className="input-section" action="#" method="post">
                <div className="input-section__fields">
                    <EmailField/>

                    <PasswordField/>

                    {/* Checkbox and Submit */}
                    <div className="log-reg__actions">
                        <RememberMe/>

                        <Button
                            className="log-reg__btn"
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </form>

            {/* Another option */}
            <div className="log-reg__alternative">
                <div className="log-reg__alternative-or">
                    <p className="log-reg__alternative-text">or sign up</p>
                </div>

                <Link to="/registration" className="log-reg__alternative-ref">
                    Create an account
                </Link>
            </div>
        </AuthLayout>
    );
};

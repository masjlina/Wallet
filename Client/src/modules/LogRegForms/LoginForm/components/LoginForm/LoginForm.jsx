import "../../../style.scss";
import Logo from "../../../../../ui/Logo/Logo";
import PasswordField from "../../../components/PasswordField/PasswordField";
import InputWithLabel from "../../../../../components/InputWithLabel/InputWithLabel";

export const LoginForm = () => {
    return (
        <div className="log-reg__wrapper">
            <div className="log-reg__container">
                <Logo/>

                {/* Sign up Form */}
                <form className="input-section" action="#" method="post" noValidate>
                    <div className="input-section__fields">
                        {/* Email Input */}
                        <InputWithLabel id="email-input"
                                        labelText="Email Address"
                                        type="email"
                                        name="email"
                                        placeholder="Your email"
                                        required
                                        minLength="5"
                                        maxLength="254"/>

                        {/* Password Input */}
                        <div className="input-section__field">
                            <PasswordField id="password-input"
                                           labelText="Password"
                                           type="password"
                                           name="password"
                                           placeholder="Type your password"
                                           required
                                           minLength="5"/>
                        </div>

                        {/* Checkbox and Submit */}
                        <div className="log-reg">
                            <div className="remember-me">
                                <input
                                    className="visually-hidden remember-me__input"
                                    type="checkbox"
                                    id="remember-me-checkbox"
                                />

                                <label
                                    className="remember-me__label"
                                    htmlFor="remember-me-checkbox"
                                >
                                    <span className="remember-me__checkbox"/>
                                    <p>Remember me</p>
                                </label>
                            </div>

                            <button
                                className="log-reg__button log-reg__button--primary"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>

                {/* Another option */}
                <div className="log-reg-alternative">
                    <div className="log-reg-alternative__or">
                        <p className="log-reg-alternative__text">or sign up</p>
                    </div>

                    <a className="log-reg-alternative__ref" href="#">
                        Create an account
                    </a>
                </div>
            </div>
        </div>
    );
};

// Styles
import "./rememberMe.scss";
import type {InputHTMLAttributes} from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>

const RememberMe = ({
                        checked,
                        onChange}: IProps) => {
    return (
        <div className="remember-me">
            <label
                className="remember-me__label"
                htmlFor="remember-me-checkbox">
                <input
                    name="rememberMe"
                    className="visually-hidden remember-me__input"
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    id="remember-me-checkbox"
                    data-testid="remember-me"
                />
                <span className="remember-me__checkbox"/>
                <p>Remember me</p>
            </label>
        </div>
    );
}

export default RememberMe;
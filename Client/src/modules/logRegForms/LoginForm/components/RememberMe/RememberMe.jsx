import "./rememberMe.scss";

const RememberMe = ({checked, onChange}) => {
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
                />
                <span className="remember-me__checkbox"/>
                <p>Remember me</p>
            </label>
        </div>
    );
}

export default RememberMe;
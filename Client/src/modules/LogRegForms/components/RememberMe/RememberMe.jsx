const RememberMe = () => {
    return (
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
    );
}

export default RememberMe;
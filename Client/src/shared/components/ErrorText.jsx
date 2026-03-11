const ErrorText = ({errors = []}) => {
    return (
        <div className="form-errors">
            {errors.map((error, i) => (
                <p key={i} className="text--red">
                    {error}
                </p>
            ))}
        </div>
    )
}

export default ErrorText;

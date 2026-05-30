interface IProps {
    errors: string[] | undefined | null;
}

const ErrorText = ({errors}: IProps) => {
    const errorList = errors ?? [];

    if (errorList.length === 0)
        return null;

    return (
        <div className="form-errors">
            {errorList.map((error, i) => (
                <p key={i} className="text--red">
                    {error}
                </p>
            ))}
        </div>
    )
}

export default ErrorText;

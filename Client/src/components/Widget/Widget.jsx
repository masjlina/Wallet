import "./widget.scss";

const Widget = (props) => {
    return (
        <div className="wrapper widget__wrapper">
            <div className="container widget__container">
                {props.children}
            </div>
        </div>
    )
}

export default Widget;
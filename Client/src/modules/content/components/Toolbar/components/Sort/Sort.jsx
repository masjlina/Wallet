import "./sort.scss";

const Sort = ({names}) => {
    const content = names.map((name, i) => {
        return <button key={i} className="btn btn__nav--text">{name}</button>
    })

    return (
        <div className="tabs text text__title">
            {content}
        </div>
    );
}

export default Sort;
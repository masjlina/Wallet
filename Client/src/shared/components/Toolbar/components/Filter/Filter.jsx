// Styles
import "./filter.scss";
import {TRANSACTION_FILTER_TYPE} from "@/shared/consts/transactionTypes";

const Filter = ({
                    currentFilter = TRANSACTION_FILTER_TYPE.ALL,
                    filters,
                    onChangeCurrentFilter
                }) => {
    const content = filters.map((filter, i) => {
        return <button
            key={i}
            className={`btn btn__nav--text ${filter === currentFilter ? "btn__nav--active--underline" : ""}`}
            onClick={() => onChangeCurrentFilter(filter)}>
            {filter}
        </button>
    });

    return (
        <div className="tabs text text__title">
            {content}
        </div>
    );
}

export default Filter;
// Styles
import "./filter.scss";
import {TRANSACTION_FILTER_TYPE, type TransactionFilterType} from "@/shared/consts/transactionTypes";
import type {ReactNode} from "react";

interface IProps {
    currentFilter: TransactionFilterType;
    filters: TransactionFilterType[];
    onChangeCurrentFilter: (newFilter: TransactionFilterType) => void;
}

const Filter = ({
                    currentFilter = TRANSACTION_FILTER_TYPE.ALL,
                    filters,
                    onChangeCurrentFilter
                }: IProps): ReactNode => {
    const content: ReactNode = filters.map((filter, i) => {
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
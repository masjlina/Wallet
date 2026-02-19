import "./transactionCol.scss";
import React from "react";

const TransactionCol = ({ tableHeaders }) => {
    return (
        <thead>
        <tr>
            {tableHeaders.map(header => (
                <th key={header} scope="col">
                    {header}
                </th>
            ))}
        </tr>
        </thead>
    );
};

export default TransactionCol
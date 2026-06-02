// Styles
import "./transactionCol.scss";
import type {TransactionColType} from "@/shared/consts/transactionTypes.ts";

type PropsType = { tableHeaders: TransactionColType[] }

const TransactionCol = ({tableHeaders}: PropsType) => {
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
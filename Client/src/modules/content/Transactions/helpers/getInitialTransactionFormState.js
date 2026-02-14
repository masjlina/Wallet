import ACCOUNT_TYPE from "../../../../consts/accountType";
import {formatLocalDateTime} from "../../../../services/dateTimeService";

const getInitialTransactionFormState = (transaction) => {
    return {
        name: transaction?.name ?? "",
        description: transaction?.description ?? "",
        amount: transaction?.amount ?? 0,
        account: transaction?.walletId
            ? `${ACCOUNT_TYPE.CASH}: ${transaction.walletId}`
            : transaction?.creditCardId
                ? `${ACCOUNT_TYPE.CARD}: ${transaction.creditCardId}`
                : "",
        createdAt: transaction?.createdAt
            ? formatLocalDateTime(new Date(transaction.createdAt))
            : formatLocalDateTime(new Date())
    }
}

export default getInitialTransactionFormState;
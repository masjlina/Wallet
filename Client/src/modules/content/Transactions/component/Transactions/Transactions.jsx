import React, {useState} from "react";
import TransactionRow from "../TransactionRow/TransactionRow";
import Button from "../../../../../ui/Button/Button";
import plusIcon from "../../../../../assets/icons/plus.svg";
import Widget from "../../../../../components/Widget/Widget";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal";

import "./transactions.scss";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";

const Transactions = () => {
    const [contextModalState, setContextModalState] = useState({
        isOpen: false,
        anchorEl: null
    });

    const [centralModalState, setCentralModalState] = useState({
        isOpen: false,
        anchorEl: null
    });

    const openModal = (e, state) => {
        state({isOpen: true, anchorEl: e.currentTarget});
    };

    const closeModal = (state) => {
        state({isOpen: false, anchorEl: null});
    };

    return (
        <div className="container content__container">
            <div className="content transactions__content--top">
                <Widget>
                    <div className="content widget__content--control">
                        <div className="tabs text text__title">
                            <button className="btn btn__nav--text">All</button>
                            <button className="btn btn__nav--text">Incomes</button>
                            <button className="btn btn__nav--text">Expenses</button>
                        </div>

                        <Button
                            className="btn__add-transaction text text__base--bold text__base--white"
                            variant="primary"
                            onClick={(e) => openModal(e, setCentralModalState)}>
                            <img src={plusIcon} alt="plus"/>
                            <p>Add transaction</p>
                        </Button>
                    </div>
                </Widget>
            </div>

            <div className="content transactions__content">
                <Widget>
                    <div className="content widget__content">
                        <table className="table table__content text text__table">
                            <thead>
                            <tr>
                                <th scope="col">NAME/BUSINESS</th>
                                <th>AMOUNT</th>
                                <th>CATEGORY</th>
                                <th>PAYMENT METHODS</th>
                                <th>DATE</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>

                            <tbody className="text text__table--name">
                            <TransactionRow onModalOpen={(e) => openModal(e, setContextModalState)}/>
                            <TransactionRow onModalOpen={(e) => openModal(e, setContextModalState)}/>
                            <AddTransactionModal/>
                            </tbody>
                        </table>
                    </div>
                </Widget>
            </div>

            {/*Context modal*/}
            <MoreActionsModal
                isOpen={contextModalState.isOpen}
                anchorEl={contextModalState.anchorEl}
                onClose={() => closeModal(setContextModalState)}
            />

            {/*Edit transaction modal*/}
            <AddTransactionModal
                isOpen={centralModalState.isOpen}
                onClose={() => closeModal(setCentralModalState)}/>
        </div>
    );
};

export {Transactions};

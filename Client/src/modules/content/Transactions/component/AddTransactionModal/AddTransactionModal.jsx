import Modal from "../../../../../components/Modal/Modal";
import MODAL_VARIANT from "../../../../../consts/modalVariants";

import xIcon from "../../../../../assets/icons/x.svg";
import arrowLeftIcon from "../../../../../assets/icons/btn-arrow--left.svg";
import arrowRightIcon from "../../../../../assets/icons/btn-arrow--right.svg";
import arrowDownIcon from "../../../../../assets/icons/arrow-down.svg";
import calendarIcon from "../../../../../assets/icons/calendar.svg";

import "./addTransactionModal.scss";
import FieldWithLabel from "../../../../../components/FieldWithLabel/FieldWithLabel";
import FieldWithIcon from "../../../../../components/FieldWithIcon/FieldWithIcon";
import Button from "../../../../../ui/Button/Button";

const AddTransactionModal = ({isOpen, onClose}) => {
    return (
        <Modal
            variant={MODAL_VARIANT.CENTRAL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="content modal__content--top text__title">
                <p>Add transaction</p>
                <button type="button" className="modal__close pointer" onClick={onClose}>
                    <img src={xIcon} alt="Close modal" />
                </button>

            </div>
            <form className="content modal__content" id="add-transaction-form">
                <div className="transaction-switcher text__base">
                    <button className="btn__transaction-switcher">Income</button>
                    <button className="btn__transaction-switcher text__base--white">Expense</button>
                    <div className="btn__transaction-switcher--accent"></div>
                </div>
                <div className="amount-input">
                    <img src={arrowLeftIcon} alt="Decrease"/>
                    <p className="text--green text--64">+$100</p>
                    <img src={arrowRightIcon} alt="Increase"/>
                </div>

                <div className="input-section__double-field">

                    {/*Transaction input*/}
                    <div className="input-section">
                        <FieldWithLabel
                            id="transaction-name"
                            labelText="Name"
                            placeholder="Transaction name"/>
                    </div>

                    {/*Account selector*/}
                    <div className="input-section">
                        <FieldWithIcon
                            id="account"
                            labelText="Account"
                            as="select"
                            icon={arrowDownIcon}
                        >
                            <option value="" hidden>Select account</option>
                        </FieldWithIcon>
                    </div>
                </div>

                {/*Description input*/}
                <div className="input-section">
                    <FieldWithLabel
                        id="description"
                        as="textarea"
                        labelText="Description"
                        placeholder="Some detail about transaction"/>
                </div>
                <div className="input-section__double-field">

                    {/*Date selector*/}
                    <div className="input-section">
                        <FieldWithIcon
                            id="date"
                            labelText="Date"
                            icon={calendarIcon}
                            type="date"/>
                    </div>

                    {/*Category selector*/}
                    <div className="input-section">
                        <FieldWithIcon
                            id="category"
                            labelText="Category"
                            as="select"
                            icon={arrowDownIcon}
                        >
                            <option value="" hidden>Select category</option>
                        </FieldWithIcon>
                    </div>
                </div>
            </form>
            <div className="content modal__content--bottom">
                <Button
                    className="btn__day-limit--empty"
                    type="button"
                    onClick={onClose}>Cancel</Button>
                <Button className="btn__day-limit--fill" type="submit" form="add-transaction-form">Save</Button>
            </div>
        </Modal>
    );
}

export default AddTransactionModal;
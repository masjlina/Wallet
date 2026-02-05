import {Widget} from "../../../../../components/Widget/Widget";
import rightArrowIcon from "../../../../../assets/icons/right-arrow--white.svg"
import mastercardLogo from "../../../../../assets/icons/logo-mastercard.svg";
import "./cardWidget.scss";
import Button from "../../../../../ui/Button/Button";
import ACCOUNT_TYPE from "../../../../../consts/accountType";

const AccountWidget = ({
                           amount,
                           cardNumber,
                           accountType = ACCOUNT_TYPE.CARD,
                           onRemove
                       }) => {
    const isCard = accountType === ACCOUNT_TYPE.CARD;

    const maskedCardNumber = isCard
        ? cardNumber.slice(0, -3) + "***"
        : null;

    return (
        <Widget>
            <Widget.Header>
                <p className="text text--inactive">{isCard ? "Credit Card" : "Cash"} </p>
                <div className="widget__header-right text--inactive">
                    {isCard &&
                        <>
                            <p>mastercard</p>
                            <img src={mastercardLogo} alt="Mastercard"/>
                        </>}

                </div>
            </Widget.Header>

            <Widget.Content className="account__content">
                <div>
                    {isCard &&
                        <>
                            <p className="text__base--bold">{maskedCardNumber}</p>
                            <p className="text--inactive">Account number</p>
                        </>}
                </div>

                <div>
                    <p className="text__base--bold">${amount}</p>
                    <p className="text--inactive">Total amount</p>
                </div>
            </Widget.Content>

            <Widget.Footer className="account__footer">
                {isCard && <button className="btn text--red" onClick={onRemove}>Remove</button>}
                <Button className="account__button">
                    <p>Details</p>
                    <img className="button__arrow" src={rightArrowIcon}/>
                </Button>
            </Widget.Footer>
        </Widget>
    );
}

export default AccountWidget;
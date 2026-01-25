import {Widget} from "../../../../../components/Widget/Widget";
import mastercardLogo from "../../../../../assets/icons/logo-mastercard.svg"
import rightArrowIcon from "../../../../../assets/icons/right-arrow--white.svg"

import "./cardWidget.scss";
import Button from "../../../../../ui/Button/Button";

const CardWidget = () => {
    return (
        <Widget>
            <Widget.Header>
                <p className="text text--inactive">Credit Card</p>
                <div className="widget__header-right text--inactive">
                    <p>mastercard</p>
                    <img src={mastercardLogo} alt="Mastercard"/>
                </div>
            </Widget.Header>

            <Widget.Content className="account__content">
                <div>
                    <p className="text__base--bold">3388 4556 8860 8***</p>
                    <p className="text--inactive">Account number</p>
                </div>

                <div>
                    <p className="text__base--bold">$25000</p>
                    <p className="text--inactive">Total amount</p>
                </div>
            </Widget.Content>

            <Widget.Footer className="account__footer">
                <button className="text--red">Remove</button>
                <Button className="account__button">
                    <p>Details</p>
                    <img className="button__arrow" src={rightArrowIcon}/>
                </Button>
            </Widget.Footer>
        </Widget>
    );
}

export default CardWidget;
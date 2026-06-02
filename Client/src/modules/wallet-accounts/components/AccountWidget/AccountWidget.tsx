// App (modules)
import {maskCardNumber} from "@/modules/wallet-accounts";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";
import {ACCOUNT_TYPE, type AccountType} from "@/shared/consts/accountType";
import {formatAmountOfMoney} from "@/shared/services/moneyService";

// UI
import Button from "@/ui/Button/Button";

// Local
import rightArrowIcon from "@/assets/icons/right-arrow--white.svg"
import mastercardLogo from "../../../../assets/icons/logo-mastercard.svg";

// Styles
import "./cardWidget.scss";

export type NavigationParams = Partial<Record<keyof typeof ACCOUNT_TYPE, number>>;

interface IProps {
    id: number;
    amount: number;
    name: string;
    accountType?: AccountType;
    openConfirmationModal?: () => void;
    onNavigateToDetails: (params: any) => void;
}

const AccountWidget = ({
                           id,
                           amount,
                           name,
                           accountType = ACCOUNT_TYPE.CARD,
                           openConfirmationModal,
                            onNavigateToDetails
                       }: IProps) => {
    const isCard = accountType === ACCOUNT_TYPE.CARD;

    const maskedCardNumber = isCard
        ? maskCardNumber(name)
        : null;
    const formattedAmount = formatAmountOfMoney(amount);

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
                    <p className="text__base--bold">{formattedAmount}</p>
                    <p className="text--inactive">Total amount</p>
                </div>
            </Widget.Content>

            <Widget.Footer className="account__footer">
                {isCard &&
                    <button
                        className="btn text--red"
                        onClick={openConfirmationModal}
                    >Remove</button>}
                <Button
                    className="account__button"
                    onClick={() => onNavigateToDetails({ [accountType]: id })}>
                    <p>Details</p>
                    <img
                        className="button__arrow"
                        src={rightArrowIcon}
                        alt="Details of the account"/>
                </Button>
            </Widget.Footer>
        </Widget>
    );
}

export default AccountWidget;
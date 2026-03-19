// React
import React, {useEffect, useState} from "react";

// External libs
import {useNavigate} from "react-router-dom";

// App (modules)
import CarouselIndicator from "../CarouselIndicator/CarouselIndicator";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";
import {ROUTES} from "@/shared/consts/routes";
import {formatAmountOfMoney} from "@/shared/services/moneyService";

// Local
import rightArrow from "@/assets/icons/right-arrow.svg";

// Styles
import "./myAccountWidget.scss";

const MyAccountWidget = ({accounts}) => {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleAccounts =
        (accounts.length > 3
            ? accounts.slice(accounts.length - 3)
            : accounts.slice(0, 3)).reverse();

    const visibleAccountsCount = visibleAccounts.length;

    const balance = formatAmountOfMoney(
        accounts.reduce(
            (sum, account) => sum + account?.balance,
            0
        ));

    useEffect(() => {
        if (visibleAccountsCount === 0) {
            setCurrentIndex(0);
            return;
        }

        if (currentIndex > visibleAccountsCount - 1) {
            setCurrentIndex(visibleAccountsCount - 1);
        }
    }, [currentIndex, visibleAccountsCount]);

    const prevSlide = () => {
        if (visibleAccountsCount <= 1) {
            setCurrentIndex(0);
            return;
        }

        setCurrentIndex(prev =>
            prev === 0 ? visibleAccountsCount - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        if (visibleAccountsCount <= 1) {
            setCurrentIndex(0);
            return;
        }

        setCurrentIndex(prev =>
            prev === visibleAccountsCount - 1 ? 0 : prev + 1
        );
    };

    const content = visibleAccounts.map((account, i) => (
        <div key={i}
             className={`carousel__item ${i === currentIndex ? "carousel__item--selected" : ""} accounts__carousel--underlay`}>
            <div className="accounts__carousel--background">
                <div className="accounts__carousel--hover">
                    <div className="content card__content">
                        <div className="content card__content--top text text__base text__base--white">
                            <div>Account Type</div>
                            <div className="text__title text__title--bolder-white">{account?.walletId ? "Credit Card" : "Wallet"}</div>
                            <div>{account?.walletId ? `•••• •••• •••• ${account.name.slice(-4)}` : ""}</div>
                        </div>

                        <div className="content card__content--bottom">
                            <div>09/25</div>
                            <div className="text__title text__title--white">{formatAmountOfMoney(account?.balance)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));


  return (
        <Widget className="my-accounts">
            <Widget.Header>
                <div className="text text__title">My Accounts</div>

                <button
                    className="view-all text__link"
                    onClick={() => navigate(ROUTES.WALLET)}>
                    <div
                        className="text text__link">
                        View All
                    </div>
                    <img
                        className="icon--widget__arrow"
                        src={rightArrow}
                        alt="Right arrow"
                    />
                </button>
            </Widget.Header>

            <Widget.Content className="accounts__content--main">
                <div className="carousel">
                    <button
                        className="accounts__carousel__btn--left"
                        onClick={prevSlide}
                    />
                    <button
                        className="accounts__carousel__btn--right"
                        onClick={nextSlide}
                    />
                    {content}
                </div>

                <div className="carousel__nav">
                    <CarouselIndicator
                        accountQuantity={visibleAccountsCount}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}/>
                </div>
            </Widget.Content>

            <Widget.Footer className="accounts__content--bottom text text__base">
                <div>Total balance:</div>
                <div className="text__base--bold">{balance}</div>
            </Widget.Footer>
        </Widget>
  );
}

export default MyAccountWidget;

import Widget from "../../../../../components/Widget/Widget";

import rightArrowIcon from "../../../../../assets/icons/right-arrow.svg";

import "./myAccountWidget.scss";
import CarouselIndicator from "../CarouselIndicator/CarouselIndicator";

const MyAccountWidget = () => {
  return (
        <Widget>
            <div className="content widget__content--title" id="accounts__content-top">
                <div className="text text__title">My Accounts</div>

                <div className="view-all">
                    <div className="text text__link">View All</div>
                    <img className="icon--widget__arrow" src={rightArrowIcon} alt="" />
                </div>
            </div>

            <div className="content accounts__content--main">
                <div className="accounts__carousel--underlay">
                    <div className="accounts__carousel--background">
                        <div className="accounts__carousel__btn--left" />
                        <div className="accounts__carousel__btn--right" />

                        <div className="accounts__carousel--hover">
                            <div className="content card__content">
                                <div className="content card__content--top text text__base text__base--white">
                                    <div>Account Type</div>
                                    <div className="text__title text__title--bolder-white">Credit Card</div>
                                    <div>•••• •••• •••• 1289</div>
                                </div>

                                <div className="content card__content--bottom">
                                    <div>09/25</div>
                                    <div className="text__title text__title--white">$5 720.20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accounts__carousel__indicator">
                    <CarouselIndicator/>
                </div>
            </div>

            <div className="content accounts__content--bottom text text__base">
                <div>Total balance:</div>
                <div className="text__base--bold">$250.399</div>
            </div>
        </Widget>
  );
}

export default MyAccountWidget;
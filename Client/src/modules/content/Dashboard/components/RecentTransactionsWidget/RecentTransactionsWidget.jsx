import Widget from "../../../../../components/Widget/Widget";

import "./recentTransactionsWidget.scss";

const RecentTransactionsWidget = () => {
  return (
        <Widget>
            <div className="content widget__content--title">
                <div className="text text__title">Recent Transactions</div>

                <div className="view-all">
                    <div className="text text__link">View All</div>
                    <img
                        className="icon--widget__arrow"
                        src="icons/right-arrow.svg"
                        alt="Right arrow"
                    />
                </div>
            </div>

            <div className="content recent-transactions__table-content text text__table">
                <div className="table table__column">
                    <div className="table table__first-block">NAME</div>
                    <div>TYPE</div>
                    <div>AMOUNT</div>
                    <div>DATE</div>
                </div>

                <div className="table table__content text">
                    <div className="table table__row">
                        <div className="table table__first-block">
                            <div className="icon--table__expense" />
                            <div className="text__table--name">Iphone 13 Pro MAX</div>
                        </div>
                        <div>Mobile</div>
                        <div className="text__table__amount--expense">-$990,50</div>
                        <div
                            className="text__table--date"
                            dangerouslySetInnerHTML={{ __html: "12.01.2020<br>09:34" }}
                        />
                    </div>

                    <div className="table table__row">
                        <div className="table table__first-block">
                            <div className="icon--table__income" />
                            <div className="text__table--name">Netflix Subscription</div>
                        </div>
                        <div>Entertainment</div>
                        <div className="text__table__amount--income">+$20</div>
                        <div
                            className="text__table--date"
                            dangerouslySetInnerHTML={{ __html: "12.01.2020<br>09:34" }}
                        />
                    </div>
                </div>
            </div>
        </Widget>
  );
}

export default RecentTransactionsWidget;
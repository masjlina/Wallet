import Widget from "../../../../../components/Widget/Widget";

import "./dayLimitWidget.scss";

const DayLimitWidget = () => {
  return (
        <Widget>
            <div className="content day-limit__graphic-content text">
                <div className="graphic">
                    <div className="graphic__background--radial">
                        <div className="graphic__fill--radial" />

                        <div className="graphic__overlap--radial">
                            <p className="text__base text__base--inactive">Day Limit</p>
                            <p className="text__primary">$50/100</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content day-limit__bottom-content text__btn">
                <button className="btn btn__day-limit--fill">Expense</button>
                <button className="btn btn__day-limit--empty">Income</button>
            </div>
        </Widget>
  );
}

export default DayLimitWidget;
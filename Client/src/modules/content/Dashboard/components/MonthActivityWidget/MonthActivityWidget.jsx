import Widget from "../../../../../components/Widget/Widget";

import "./monthActivityWidget.scss";

const MonthActivityWidget = () => {
  return (
        <Widget>
                <div className="content widget__content--title">
                    <div className="text text__title">Month Activities</div>

                    <div className="content widget__content--title-right">
                        <img className="icon icon--base-24" src="icons/calendar.svg" alt="" />
                        <p>Jan 21 - Sep 21, 2022</p>
                    </div>
                </div>

                <div className="content activities__graphic-content">
                    <img className="graphic" src="icons/graphic.svg" alt="" />
                </div>
        </Widget>
  );
}

export default MonthActivityWidget;
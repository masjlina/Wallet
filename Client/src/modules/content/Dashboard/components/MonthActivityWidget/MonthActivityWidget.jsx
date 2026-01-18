import Widget from "../../../../../components/Widget/Widget";
import calendarIcon from "../../../../../assets/icons/calendar.svg";
import graphicIcon from "../../../../../assets/icons/graphic.svg";

import "./monthActivityWidget.scss";

const MonthActivityWidget = () => {
    return (
        <Widget>
            <div className="content widget__content--title">
                <div className="text text__title">Month Activities</div>

                <div className="content widget__content--title-right">
                    <img className="icon icon--base-24" src={calendarIcon} alt="calendar" />
                    <p>Jan 21 - Sep 21, 2022</p>
                </div>
            </div>

            <div className="content activities__graphic-content">
                <img className="graphic" src={graphicIcon} alt="graphic" />
            </div>
        </Widget>
    );
};

export default MonthActivityWidget;

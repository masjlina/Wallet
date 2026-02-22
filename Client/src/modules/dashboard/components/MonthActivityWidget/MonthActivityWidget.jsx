// Shared
import {Widget} from "@/shared/components/Widget/Widget";

// Local
import calendarIcon from "@/assets/icons/calendar.svg";
import graphicIcon from "@/assets/icons/graphic.svg";

// Styles
import "./monthActivityWidget.scss";

const MonthActivityWidget = () => {
    return (
        <Widget>
            <Widget.Header>
                <div className="text text__title">Month Activities</div>

                <div className="content widget__header-right">
                    <img className="icon icon--base-24" src={calendarIcon} alt="calendar" />
                    <p>Jan 21 - Sep 21, 2022</p>
                </div>
            </Widget.Header>

            <Widget.Content className="activities__graphic-content">
                <img className="graphic" src={graphicIcon} alt="graphic"/>
            </Widget.Content>
        </Widget>
    );
};

export default MonthActivityWidget;

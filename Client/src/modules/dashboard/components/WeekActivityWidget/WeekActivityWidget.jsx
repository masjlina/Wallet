// Shared
import {Widget} from "@/shared/components/Widget/Widget";

// Local
import calendarIcon from "@/assets/icons/calendar.svg";

// Styles
import "./weekActivityWidget.scss";
import Graph from "@/modules/dashboard/components/Graph/Graph";
import {getDayAgo} from "@/shared/services/dateTimeService";

const WeekActivityWidget = ({everyDaySpentThisWeek}) => {
    const year = new Date().getFullYear();

    const today = new Date();

    const weekAgo = getDayAgo(6);

    const todayMonth = today.toLocaleString("default", {month: "short"});
    const todayDay = today.getDate();

    const weekAgoMonth = weekAgo.toLocaleString("default", {month: "short"});
    const weekAgoDay = weekAgo.getDate();

    return (
        <Widget className="">
            <Widget.Header>
                <div className="text text__title">Activities</div>

                <div className="content widget__header-right">
                    <img className="icon icon--base-24" src={calendarIcon} alt="calendar" />
                    <p>{weekAgoMonth} {weekAgoDay}</p>
                    -
                    <p>{todayMonth} {todayDay}, {year}</p>
                </div>
            </Widget.Header>

            <Widget.Content className="activities__graphic-content">
                <Graph data={everyDaySpentThisWeek}/>
            </Widget.Content>
        </Widget>
    );
};

export default WeekActivityWidget;

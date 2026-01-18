import MonthBudgetWidget from "../MonthBudgetWidget/MonthBudgetWidget";
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import MyAccountWidget from "../MyAccountWidget/MyAccountWidget";
import RecentTransactionsWidget from "../RecentTransactionsWidget/RecentTransactionsWidget";
import MonthActivityWidget from "../MonthActivityWidget/MonthActivityWidget";

import "./dashboard.scss";

const Dashboard = () => {
    return (
        <div className="container content__container">
            <div className="content dashboard__content--top">
                <MonthBudgetWidget/>
                <DayLimitWidget/>
                <MyAccountWidget/>
            </div>

            <div className="content dashboard__content--bottom">
                <RecentTransactionsWidget/>
                <MonthActivityWidget/>
            </div>
        </div>
    )
}

export {Dashboard};
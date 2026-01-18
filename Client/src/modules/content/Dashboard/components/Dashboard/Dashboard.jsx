import MonthBudgetWidget from "../MonthBudgetWidget/MonthBudgetWidget";
import DayLimitWidget from "../DayLimitWidget/DayLimitWidget";
import MyAccountWidget from "../MyAccountWidget/MyAccountWidget";
import RecentTransactionsWidget from "../RecentTransactionsWidget/RecentTransactionsWidget";
import MonthActivityWidget from "../MonthActivityWidget/MonthActivityWidget";

import "./dashboard.scss";

const Dashboard = () => {
    return (
        <div className="container content__container dashboard__layout">
            {/* Dashboard top */}
            <div className="content dashboard__content--top">
                {/* Month Budget widget */}
                <MonthBudgetWidget/>

                {/* Day Limit widget */}
                <DayLimitWidget/>

                {/* My Accounts widget */}
                <MyAccountWidget/>
            </div>

            {/* Dashboard bottom */}
            <div className="content dashboard__content--bottom">
                {/* Recent Transactions widget */}
                <RecentTransactionsWidget/>

                {/* Month Activities widget */}
                <MonthActivityWidget/>
            </div>
        </div>
    )
}

export {Dashboard};
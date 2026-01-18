import Widget from "../../../../../components/Widget/Widget";

import "./monthBudgetWidget.scss";

const MonthBudgetWidget = () => {
  return (
        <Widget>
            <div className="content widget__content--title">
                <div className="text text__title">Month Budget</div>
            </div>

            <div className="content widget__content">
                <div className="content month-limit__left-content text">
                    <div className="widget__month-limit">
                        <p className="text__base">Month limit:</p>
                        <p className="text text__base--bold">$1000</p>
                    </div>

                    <div className="widget__spent-month">
                        <p className="text__base">Spent this month:</p>
                        <p className="text text__base--bold">$800</p>
                    </div>

                    <div className="widget__rem-balance">
                        <p className="text__base">Remaining balance:</p>
                        <p className="text text__base--bold">$200</p>
                    </div>
                </div>

                <div className="content month-limit__right-content">
                    <div className="graphic">
                        <div className="graphic__background--bar">
                            <div className="graphic__fill--bar" />
                            <p className="graphic__fill--procent">80%</p>
                        </div>
                    </div>
                </div>
            </div>
        </Widget>
  );
}

export default MonthBudgetWidget;
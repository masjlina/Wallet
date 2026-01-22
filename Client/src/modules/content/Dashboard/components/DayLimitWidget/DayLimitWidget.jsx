import {Widget} from "../../../../../components/Widget/Widget";

import "./dayLimitWidget.scss";
import Button from "../../../../../ui/Button/Button";

const DayLimitWidget = () => {
  return (
        <Widget>
            <Widget.Content className="content day-limit__graphic-content text">
                <div className="graphic">
                    <div className="graphic__background--radial">
                        <div className="graphic__fill--radial" />

                        <div className="graphic__overlap--radial">
                            <p className="text__base text__base--inactive">Day Limit</p>
                            <p className="text__primary">$50/100</p>
                        </div>
                    </div>
                </div>
            </Widget.Content>

            <Widget.Footer className="content day-limit__bottom-content text__btn">
                <Button className="btn btn__day-limit--fill">Expense</Button>
                <button className="btn btn__day-limit--empty">Income</button>
            </Widget.Footer>
        </Widget>
  );
}

export default DayLimitWidget;
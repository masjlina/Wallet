import React from "react";

import "./toolbar.scss";
import {Widget} from "../../../../../../components/Widget/Widget";

const Toolbar = ({children}) => {
    return (
        <Widget className="toolbar">
            <div className="content toolbar__content">
                {children}
            </div>
        </Widget>
    );
}

export default Toolbar;
// React
import React from "react";

// Shared
import {Widget} from "@/shared/components/Widget/Widget";

// Styles
import "./toolbar.scss";

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

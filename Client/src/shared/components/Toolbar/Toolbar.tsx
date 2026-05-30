// Shared
import {Widget} from "@/shared/components/Widget/Widget";

// Styles
import "./toolbar.scss";
import type {ReactNode} from "react";

interface IProps {
    children: ReactNode
}

const Toolbar = ({children}: IProps): ReactNode => {
    return (
        <Widget className="toolbar">
            <div className="content toolbar__content">
                {children}
            </div>
        </Widget>
    );
}

export default Toolbar;

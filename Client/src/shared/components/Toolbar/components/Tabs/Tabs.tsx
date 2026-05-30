// Styles
import "./tabs.scss";
import {TABS, type TabsType} from "@/shared/consts/tabs";
import type {ReactNode} from "react";

interface IProps {
    tabs: TabsType[];
    currentTab: TabsType | undefined;
    onChangeTab: (newTab: TabsType) => void
}

const Tabs = ({
                  tabs = [],
                  currentTab = TABS.PROFILE,
                  onChangeTab
              }: IProps): ReactNode => {
    const content: ReactNode = tabs.map((tab, i) => {
        return <button
            key={i}
            className={`btn btn__nav--text ${tab === currentTab ? "btn__nav--active--underline" : ""}`}
            onClick={() => onChangeTab(tab)}>
            {tab}
        </button>
    });

    return (
        <div className="tabs text text__title">
            {content}
        </div>
    );
}

export default Tabs;
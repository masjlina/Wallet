// Styles
import "./tabs.scss";
import {TABS} from "@/shared/consts/tabs";

const Tabs = ({
                  tabs = [],
                  currentTab = TABS.PROFILE,
                  onChangeTab
              }) => {
    const content = tabs.map((tab, i) => {
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
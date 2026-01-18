import leftArrowIcon from "../../../../assets/icons/left-arrow.svg";
import dashboardIcon from "../../../../assets/icons/four-blocks.svg";
import transactionsIcon from "../../../../assets/icons/dot-list.svg";
import walletIcon from "../../../../assets/icons/wallet.svg";
import settingsIcon from "../../../../assets/icons/gear.svg";
import logoutIcon from "../../../../assets/icons/out-door.svg";

import {NavLink, useNavigate} from "react-router-dom";
import urlPaths from "../../../../utils/enumeration";

import "./sidebar.scss";

const Sidebar = () => {
    const navigate = useNavigate();

    const btnClasses = "side-bar__item btn btn__nav";

    const navClass = ({isActive}) =>
        isActive ? `${btnClasses} btn__nav--active` : btnClasses;

    return (
        <div className="wrapper side-bar__wrapper">
            <div className="container side-bar__container">
                <div>
                    <img className="icon--side-bar__arrow" src={leftArrowIcon} alt="Left arrow"/>
                </div>

                <div className="content side-bar__content">
                    <div className="side-bar__top">
                        <NavLink to={urlPaths.dashboard} className={navClass}>
                            <img className="icon" src={dashboardIcon} alt="Dashboard"/>
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink to={urlPaths.transactions} className={navClass}>
                            <img className="icon" src={transactionsIcon} alt="Transactions"/>
                            <p>Transactions</p>
                        </NavLink>

                        <NavLink to={urlPaths.wallet} className={navClass}>
                            <img className="icon" src={walletIcon} alt="Wallet"/>
                            <p>Wallet</p>
                        </NavLink>
                    </div>

                    <div className="side-bar__bottom">
                        <NavLink to={urlPaths.settings} className={navClass}>
                            <img className="icon" src={settingsIcon} alt="Settings"/>
                            <p>Settings</p>
                        </NavLink>

                        <button type="button" className={btnClasses}>
                            <img className="icon" src={logoutIcon} alt="Logout"/>
                            <p>Logout</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

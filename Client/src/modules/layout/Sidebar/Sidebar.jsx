// React
// External libs
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

// Shared
import {ROUTES} from "@/shared/consts/routes";

// Local
import transactionsIcon from "@/assets/icons/dot-list.svg";
import dashboardIcon from "@/assets/icons/four-blocks.svg";
import settingsIcon from "@/assets/icons/gear.svg";
import leftArrowIcon from "@/assets/icons/left-arrow.svg";
import logoutIcon from "@/assets/icons/out-door.svg";
import walletIcon from "@/assets/icons/wallet.svg";

// Styles
import "./sidebar.scss";
import {usePersistedState} from "@/shared/hooks/usePersistedState";
import {logoutUser} from "@/modules/auth/store/authThunks";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = usePersistedState("isSidebarCollapsed", "true");

    const btnClasses = "side-bar__item btn btn__nav";

    const navClass = ({isActive}) =>
        isActive ? `${btnClasses} btn__nav--active` : btnClasses;

    const toggleSidebar = () => {
        setIsCollapsed(prev => {
            const next = !prev;
            return next;
        });
    };

    const onLogout = () => {
        dispatch(logoutUser());
        navigate(ROUTES.LOGIN);
    }

    return (
        <div className={`wrapper side-bar__wrapper ${isCollapsed ? "side-bar__wrapper--collapsed" : ""}`}>
            <div className="container side-bar__container">
                <div>
                    <img
                        className="icon--side-bar__arrow"
                        src={leftArrowIcon}
                        alt="Left arrow"
                        onClick={toggleSidebar}/>
                </div>

                <div className="content side-bar__content">
                    <div className="side-bar__top">
                        <NavLink to={ROUTES.DASHBOARD} className={navClass}>
                            <img className="icon" src={dashboardIcon} alt="Dashboard"/>
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink to={ROUTES.TRANSACTIONS} className={navClass}>
                            <img className="icon" src={transactionsIcon} alt="Transactions"/>
                            <p>Transactions</p>
                        </NavLink>

                        <NavLink to={ROUTES.WALLET} className={navClass}>
                            <img className="icon" src={walletIcon} alt="Wallet"/>
                            <p>Wallet</p>
                        </NavLink>
                    </div>

                    <div className="side-bar__bottom">
                        <NavLink to={ROUTES.SETTINGS} className={navClass}>
                            <img className="icon" src={settingsIcon} alt="Settings"/>
                            <p>Settings</p>
                        </NavLink>

                        <button
                            type="button"
                            className={btnClasses}
                            onClick={(e) => {
                                e.preventDefault();
                                onLogout();
                            }}>
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

// External libs
import {Outlet, useLocation} from "react-router-dom";

// App (modules)
import {Header, Sidebar} from "@/modules/layout";

// Styles
import "./rootLayout.scss";
import ToastNotificationModal from "@/shared/components/Modal/components/ToastNotificationModal/ToastNotificationModal";
import {useDispatch, useSelector} from "react-redux";
import {removeNotification} from "@/app/store/notificationSlice";
import {ROUTES} from "@/shared/consts/routes";

const RootLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const notifications = useSelector(
        state => state.notification?.items || []
    );

    const isInternalScrollPage =
        location.pathname === ROUTES.WALLET ||
        location.pathname === ROUTES.TRANSACTIONS;

    return (
        <div className="wrapper main__wrapper main__wrapper--app">
            <div className="main__grid-layout main__grid-layout--app">
                <Header/>
                <Sidebar/>
                <div className={`wrapper content__wrapper ${isInternalScrollPage ? "content__wrapper--locked" : ""}`}>
                    <Outlet/>
                </div>
            </div>

            {notifications.map((n, index) => (
                <ToastNotificationModal
                    key={n.id}
                    isOpen={true}
                    stackIndex={index}
                    onClose={() => dispatch(removeNotification(n.id))}
                    type={n.type}
                    message={n.message}
                />
            ))}
        </div>
    );
};

export default RootLayout;

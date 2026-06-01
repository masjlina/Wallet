// External libs
import {Outlet, useLocation} from "react-router-dom";

// App (modules)
import {Header, Sidebar} from "@/modules/layout";

// Styles
import "./rootLayout.scss";
import ToastNotificationModal from "@/shared/components/Modal/components/ToastNotificationModal/ToastNotificationModal";
import {type INotification, removeNotification} from "@/app/store/notificationSlice";
import {ROUTES} from "@/shared/consts/routes";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";

const RootLayout = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const notifications = useAppSelector(
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

            {notifications.map((n: INotification, index) => (
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

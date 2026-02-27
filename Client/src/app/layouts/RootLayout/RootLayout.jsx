// External libs
import {Outlet} from "react-router-dom";

// App (modules)
import {Header, Sidebar} from "@/modules/layout";

// Styles
import "./rootLayout.scss";
import ToastNotificationModal from "@/shared/components/Modal/components/ToastNotificationModal/ToastNotificationModal";
import {useDispatch, useSelector} from "react-redux";
import {removeNotification} from "@/app/store/notificationSlice";

const RootLayout = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(
        state => state.notification.items
    );

    return (
        <div className="wrapper main__wrapper">
            <div className="main__grid-layout">
                <Header/>
                <Sidebar/>
                <div className="wrapper content__wrapper">
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

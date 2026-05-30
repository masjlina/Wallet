import {NOTIFICATION_INTENT, type NotificationIntentType} from "@/shared/consts/notificationIntentTypes";

import "./toastIcon.scss";
import type {ReactNode} from "react";

interface IProps {
    type: NotificationIntentType
}

const ToastIcon = ({type = NOTIFICATION_INTENT.INFO}: IProps): ReactNode => {
    let content;

    switch (type) {
        case NOTIFICATION_INTENT.SUCCESS: {
            content = (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                          fill="currentColor"/>
                    <path
                        d="M10.2 15.3L7.7 12.8C7.31 12.41 6.68 12.41 6.29 12.8C5.9 13.19 5.9 13.82 6.29 14.21L9.5 17.42C9.89 17.81 10.52 17.81 10.91 17.42L17.71 10.62C18.1 10.23 18.1 9.6 17.71 9.21C17.32 8.82 16.69 8.82 16.3 9.21L10.2 15.3Z"
                        fill="currentColor"/>
                </svg>
            );
            break;
        }
        case NOTIFICATION_INTENT.ERROR: {
            content = (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                          fill="currentColor"/>
                    <path
                        d="M15.54 8.46C15.15 8.07 14.52 8.07 14.13 8.46L12 10.59L9.87 8.46C9.48 8.07 8.85 8.07 8.46 8.46C8.07 8.85 8.07 9.48 8.46 9.87L10.59 12L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L12 13.41L14.13 15.54C14.52 15.93 15.15 15.93 15.54 15.54C15.93 15.15 15.93 14.52 15.54 14.13L13.41 12L15.54 9.87C15.93 9.48 15.93 8.85 15.54 8.46Z"
                        fill="currentColor"/>
                </svg>
            );
            break;
        }
        case NOTIFICATION_INTENT.WARNING:
            content = (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M12 3L1 21H23L12 3Z"
                          fill="currentColor"/>
                    <path
                        d="M11 9C11 8.45 11.45 8 12 8C12.55 8 13 8.45 13 9V14C13 14.55 12.55 15 12 15C11.45 15 11 14.55 11 14V9Z"
                        fill="currentColor"/>
                    <path
                        d="M12 18C12.83 18 13.5 17.33 13.5 16.5C13.5 15.67 12.83 15 12 15C11.17 15 10.5 15.67 10.5 16.5C10.5 17.33 11.17 18 12 18Z"
                        fill="currentColor"/>
                </svg>
            );
            break;
        case NOTIFICATION_INTENT.INFO: {
            content = (
                <svg className="toast__icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                          fill="currentColor"/>
                    <path
                        d="M11 10C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V10Z"
                        fill="currentColor"/>
                    <path
                        d="M12 7.5C12.83 7.5 13.5 6.83 13.5 6C13.5 5.17 12.83 4.5 12 4.5C11.17 4.5 10.5 5.17 10.5 6C10.5 6.83 11.17 7.5 12 7.5Z"
                        fill="currentColor"/>
                </svg>
            );
            break;
        }
    }

    return (
        <>
            {content}
        </>
    )
}

export default ToastIcon;
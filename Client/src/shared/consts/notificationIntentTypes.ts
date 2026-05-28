const NOTIFICATION_INTENT = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info"
};

export type NOTIFICATION_INTENT = typeof NOTIFICATION_INTENT[keyof typeof NOTIFICATION_INTENT];
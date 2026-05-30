export const NOTIFICATION_INTENT = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info"
} as const;

export type NotificationIntentType = typeof NOTIFICATION_INTENT[keyof typeof NOTIFICATION_INTENT];


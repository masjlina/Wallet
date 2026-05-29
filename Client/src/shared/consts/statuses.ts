export const STATUSES = {
    "LOADING": "LOADING",
    "SUCCEEDED": "SUCCEEDED",
    "IDLE": "IDLE",
    "FAILED": "FAILED"
} as const;

export type StatusType = typeof STATUSES[keyof typeof STATUSES];
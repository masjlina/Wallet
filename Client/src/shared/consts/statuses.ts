const STATUSES = {
    "LOADING": "LOADING",
    "SUCCEEDED": "SUCCEEDED",
    "IDLE": "IDLE",
    "FAILED": "FAILED"
} as const;

export type STATUSES = typeof STATUSES[keyof typeof STATUSES];
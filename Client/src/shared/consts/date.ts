const DAYS_OF_WEEK = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
] as const;

export type DAYS_OF_WEEK = typeof DAYS_OF_WEEK[number];

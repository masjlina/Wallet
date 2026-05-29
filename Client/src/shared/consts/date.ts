export const DAYS_OF_WEEK = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
] as const;

export type DayOfWeekType = typeof DAYS_OF_WEEK[number];
export type DaysOfWeekType = readonly [DayOfWeekType, DayOfWeekType, DayOfWeekType, DayOfWeekType, DayOfWeekType, DayOfWeekType, DayOfWeekType];

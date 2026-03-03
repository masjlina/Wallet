import {formatWeekday} from "@/shared/services/dateTimeService";

export const DAYS_OF_WEEK = Object.freeze([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
]);

export const sortedDaysOfWeek = () => {
    const today = new Date();

    const todayIndex = DAYS_OF_WEEK.findIndex(
        (day) => day === formatWeekday(today)
    );

    if (todayIndex === -1) return DAYS_OF_WEEK;

    return [
        ...DAYS_OF_WEEK.slice(todayIndex),
        ...DAYS_OF_WEEK.slice(0, todayIndex),
    ];
};
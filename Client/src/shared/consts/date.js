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
    const today = formatWeekday(new Date());
    const todayIndex = DAYS_OF_WEEK.indexOf(today);

    if (todayIndex === -1) return DAYS_OF_WEEK;

    const before = DAYS_OF_WEEK.slice(0, todayIndex).reverse();
    const after = DAYS_OF_WEEK.slice(todayIndex + 1).reverse();

    return [DAYS_OF_WEEK[todayIndex], ...before, ...after];
};
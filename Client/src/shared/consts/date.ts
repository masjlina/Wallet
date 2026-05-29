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

export const sortedDaysOfWeek = (): DaysOfWeekType => {
    const today = new Date().toLocaleDateString("en-US", {weekday: "short"}) as DayOfWeekType;
    const todayIndex = DAYS_OF_WEEK.indexOf(today);

    if (todayIndex === -1) return DAYS_OF_WEEK;

    const before = DAYS_OF_WEEK.slice(0, todayIndex).reverse();
    const after = DAYS_OF_WEEK.slice(todayIndex + 1).reverse();

    return [DAYS_OF_WEEK[todayIndex], ...before, ...after] as unknown as DaysOfWeekType;
};

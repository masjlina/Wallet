import {type DayOfWeekType, DAYS_OF_WEEK, type DaysOfWeekType} from "@/shared/consts/date";

export const formatLocalDateTime = (date: Date): string => {
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${
        pad(date.getMonth() + 1)
    }-${pad(date.getDate())}T${
        pad(date.getHours())
    }:${pad(date.getMinutes())}`;
};

export const formatWeekday = (date: Date): DayOfWeekType =>
    date.toLocaleString("default", { weekday: "short" }) as DayOfWeekType;

export const getLocalDateKey = (date = new Date()): string => {
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const getMonthKey = (date: Date = new Date()): string => {
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
};

export const getDayAgo = (day: number = 1): Date => {
    const now = new Date();

    const weekAgo = new Date(now)
    weekAgo.setDate(now.getDate() - day);

    return weekAgo;
}

export const getThisMonthDays = (): number => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
}

export const getDaysToNextMonth = (): number => {
    const today = new Date();
    const daysInMonth = getThisMonthDays();
    return daysInMonth - today.getDate();
}

export const getRemainingMonthDays = ({ includeToday = true } = {}): number => {
    const daysToNextMonth = getDaysToNextMonth();

    return includeToday ? daysToNextMonth + 1 : daysToNextMonth;
};

export const sortedDaysOfWeek = (): DaysOfWeekType => {
    const today = formatWeekday(new Date());
    const todayIndex = DAYS_OF_WEEK.indexOf(today);

    if (todayIndex === -1) return DAYS_OF_WEEK;

    const before = DAYS_OF_WEEK.slice(0, todayIndex).reverse();
    const after = DAYS_OF_WEEK.slice(todayIndex + 1).reverse();

    const result = [DAYS_OF_WEEK[todayIndex], ...before, ...after] as const;

    return result as unknown as DaysOfWeekType;
};

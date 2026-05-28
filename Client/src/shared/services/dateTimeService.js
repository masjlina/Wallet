import {DAYS_OF_WEEK} from "@/shared/consts/date";

export const formatLocalDateTime = (date) => {
    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${
        pad(date.getMonth() + 1)
    }-${pad(date.getDate())}T${
        pad(date.getHours())
    }:${pad(date.getMinutes())}`;
};

export const formatWeekday = (date) =>
    date.toLocaleString("default", { weekday: "short" });

export const getLocalDateKey = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const getMonthKey = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
};

export const getDayAgo = (day = 1) => {
    const now = new Date();

    const weekAgo = new Date(now)
    weekAgo.setDate(now.getDate() - day);

    return weekAgo;
}

export const getThisMonthDays = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
}

export const getDaysToNextMonth = () => {
    const today = new Date();
    const daysInMonth = getThisMonthDays();
    return daysInMonth - today.getDate();
}

export const getRemainingMonthDays = ({ includeToday = true } = {}) => {
    const daysToNextMonth = getDaysToNextMonth();

    return includeToday ? daysToNextMonth + 1 : daysToNextMonth;
};

export const sortedDaysOfWeek = () => {
    const today = formatWeekday(new Date());
    const todayIndex = DAYS_OF_WEEK.indexOf(today);

    if (todayIndex === -1) return DAYS_OF_WEEK;

    const before = DAYS_OF_WEEK.slice(0, todayIndex).reverse();
    const after = DAYS_OF_WEEK.slice(todayIndex + 1).reverse();

    return [DAYS_OF_WEEK[todayIndex], ...before, ...after];
};

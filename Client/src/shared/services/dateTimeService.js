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

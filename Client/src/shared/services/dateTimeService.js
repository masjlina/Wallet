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

export const getDayAgo = (day = 1) => {
    const now = new Date();

    const weekAgo = new Date(now)
    weekAgo.setDate(now.getDate() - day);

    return weekAgo;
}
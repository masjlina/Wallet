export function shouldShowDaySummary() {
    const today = new Date().toISOString().slice(0, 10);
    const lastSeen = localStorage.getItem("lastSeenDaySummary");

    return lastSeen !== today;
}

export function markDaySummarySeen() {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("lastSeenDaySummary", today);
}
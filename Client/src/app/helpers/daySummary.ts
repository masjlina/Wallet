import {getLocalDateKey, getMonthKey} from "@/shared/services/dateTimeService";

const LAST_SEEN_DAY_SUMMARY_KEY = "lastSeenDaySummary";
const LAST_MONTHLY_RESET_KEY = "lastMonthlyLimitReset";

export function shouldShowDaySummary(): boolean {
    const today = getLocalDateKey();
    const lastSeen = localStorage.getItem(LAST_SEEN_DAY_SUMMARY_KEY);

    return lastSeen !== today;
}

export function markDaySummarySeen(): void {
    localStorage.setItem(LAST_SEEN_DAY_SUMMARY_KEY, getLocalDateKey());
}

export function shouldResetMonthlyLimit(): boolean {
    const currentMonth = getMonthKey();
    const lastResetMonth = localStorage.getItem(LAST_MONTHLY_RESET_KEY);

    if (lastResetMonth === null) {
        localStorage.setItem(LAST_MONTHLY_RESET_KEY, currentMonth);
        return false;
    }

    return lastResetMonth !== currentMonth;
}

export function markMonthlyLimitReset(): void {
    localStorage.setItem(LAST_MONTHLY_RESET_KEY, getMonthKey());
}

import {afterAll, afterEach, beforeAll, describe, expect, test, vi} from "vitest";
import {
    formatLocalDateTime,
    formatWeekday,
    getDayAgo,
    getDaysToNextMonth,
    getLocalDateKey,
    getMonthKey,
    getRemainingMonthDays,
    getThisMonthDays
} from "@/shared/services/dateTimeService";

beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-04-01T20:12:00"));
});

afterEach(() => {
    vi.setSystemTime(new Date("2020-04-01T20:12:00"));
});

afterAll(() => {
    vi.useRealTimers();
});

describe("formatLocalDateTime", () => {
    test("correct value", () => {
        expect(formatLocalDateTime(new Date())).toBe("2020-04-01T20:12");
    });
});

describe("formatWeekday", () => {
    test("correct week day", () => {
        expect(formatWeekday(new Date())).toMatch(/Wed|Mi|Ср/);
    });
});

describe("getLocalDateKey", () => {
    test("correct value", () => {
        expect(getLocalDateKey(new Date())).toBe("2020-04-01");
    });
});

describe("getMonthKey", () => {
    test("correct value", () => {
        expect(getMonthKey(new Date())).toBe("2020-04");
    });
});

describe("getDayAgo", () => {
    test("correct value", () => {
        const result = getDayAgo(7);

        expect(result.getFullYear()).toBe(2020);
        expect(result.getMonth()).toBe(2);
        expect(result.getDate()).toBe(25);
    });
});

describe("getThisMonthDays", () => {
    test("correct value", () => {
        expect(getThisMonthDays()).toBe(30);
    });
});

describe("getDaysToNextMonth", () => {
    test("firs day of a month", () => {
        vi.setSystemTime(new Date("2020-03-01T00:00:00"));

        expect(getDaysToNextMonth()).toBe(30);
    });

    test("end of a month", () => {
        vi.setSystemTime(new Date("2020-02-28T00:00:00"));

        expect(getDaysToNextMonth()).toBe(1);
    });

    test("leap year", () => {
        vi.setSystemTime(new Date("2020-02-01T00:00:00"));

        expect(getDaysToNextMonth()).toBe(28);
    });
});

describe("getRemainingMonthDays", () => {
    test("correct value with this day", () => {
        expect(getRemainingMonthDays()).toBe(30);
    });

    test("correct value without including this day", () => {
        expect(getRemainingMonthDays({includeToday: false})).toBe(29);
    });
});
import {
    formatAmountOfMoney,
    formatParentheses,
    getClazzAmountOfMoneyColor,
    round2
} from "@/shared/services/moneyService";
import {describe, expect, test} from 'vitest'


describe("round2", () => {
    test("rounds down correctly", () => {
        expect(round2(10.234)).toBe(10.23);
    });

    test("rounds up correctly", () => {
        expect(round2(10.235)).toBe(10.24);
    });

    test("handles whole numbers", () => {
        expect(round2(10)).toBe(10);
    });

    test("handles one decimal", () => {
        expect(round2(10.2)).toBe(10.2);
    });
});

describe("formatAmountOfMoney", () => {
    test("positive number without sign", () => {
        expect(formatAmountOfMoney(100)).toEqual("$100");
    });
    test("negative number with sign minus", () => {
        expect(formatAmountOfMoney(-12)).toEqual("-$12");
    });
    test("zero without sign", () => {
        expect(formatAmountOfMoney(0)).toEqual("$0");
    });
});

describe("getClazzAmountOfMoneyColor", () => {
    test("positive number is green", () => {
        expect(getClazzAmountOfMoneyColor(5)).toEqual("text--green");
    });
    test("negative number is red", () => {
        expect(getClazzAmountOfMoneyColor(-12)).toEqual("text--red");
    });
        test("zero is grey", () => {
        expect(getClazzAmountOfMoneyColor(0)).toEqual("text--inactive");
    });
});

describe("formatParentheses", () => {
    test("negative number wrapped in parentheses", () => {
        expect(formatParentheses(-10)).toBe("(-10)");
    });

    test("positive number unchanged", () => {
        expect(formatParentheses(10)).toBe(10);
    });
});


export const round2 = (n: number): number => {
    return Math.round(n * 100) / 100;
}

export const formatAmountOfMoney = (num: number): string => {
    if (isNaN(num)) return "";

    const sign = num < 0 ? "-" : "";
    const abs = Math.abs(num);
    return `${sign}$${abs}`;
};

type AmountColorType = "text--red" | "text--inactive" | "text--green";
export const getClazzAmountOfMoneyColor = (num: number): AmountColorType => {
    if (num < 0) return "text--red";
    else if (num === 0) return "text--inactive";
    else return "text--green";
};

export const formatParentheses = (num: number): number | string => {
    if (num < 0) return `(${num})`
    else return num
}
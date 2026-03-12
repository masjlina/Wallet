function round2(n) {
    return Math.round(n * 100) / 100;
}

export const formatAmountOfMoney = (num) => {
    if (isNaN(num)) return 0;

    const sign = num < 0 ? "-" : "";
    const abs = Math.abs(num);
    return `${sign}$${abs}`;
};

export const getClazzAmountOfMoneyColor = (num) => {
    if (num < 0) return "text--red";
    else if (num === 0) return "text--inactive";
    else return "text--green";
};

export {round2};
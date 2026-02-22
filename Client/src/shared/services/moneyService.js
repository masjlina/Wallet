function round2(n) {
    return Math.round(n * 100) / 100;
}

export const formatAmountOfMoney = (num) => {
    const sign = num < 0 ? "-" : "";
    const abs = Math.abs(num);
    return `${sign}$${abs}`;
};

export {round2};
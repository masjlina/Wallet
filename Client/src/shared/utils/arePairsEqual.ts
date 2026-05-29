export const arePairsEqual = (...values: string[]): boolean => {
    if (values.length % 2 !== 0)
        return false;

    for (let i = 0; i <= values.length - 1; i += 2) {
        if (values[i] !== values[i + 1])
            return false;
    }

    return true;
}
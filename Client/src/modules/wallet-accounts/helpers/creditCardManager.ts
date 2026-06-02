export function formatCardNumber(cardNumber: string): string {
    return cardNumber
        .replace(/\D/g, "")
        .slice(0, 19)
        .replace(/(.{4})/g, "$1 ")
        .trim();
}

export const maskCardNumber = (cardNumber: string): string => {
    return cardNumber.slice(0, -3) + "***";
}

const luhnCheck = (number: string): boolean => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = Number(number[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

export const isValidCardNumber = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");

    return (
        isValidLength(digits) &&
        luhnCheck(digits)
    );
};

const isValidLength = (digits: string): boolean =>
    digits.length >= 13 && digits.length <= 19;

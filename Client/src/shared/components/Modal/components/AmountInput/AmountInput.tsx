// React
import {type ChangeEvent, type Dispatch, type MouseEvent, type SetStateAction, useEffect, useState} from "react";

// Shared
import useInput from "@/shared/hooks/useInput";
import {formatAmountOfMoney, round2} from "@/shared/services/moneyService";

// Local
import arrowLeftIcon from "@/assets/icons/btn-arrow--left.svg";
import arrowRightIcon from "@/assets/icons/btn-arrow--right.svg";

// Styles
import "./amountInput.scss";

interface IProps {
    balance: number;
    setBalance: Dispatch<SetStateAction<number>>;
}

const AmountInput = ({balance, setBalance}: IProps) => {
    const formattedInput = useInput<string>("$");
    const [inputColor, setInputColor] = useState("text--green");

    useEffect(() => {
        const currentString = formattedInput.value.replace(/[^0-9.,]/g, "").replace(",", ".");
        const currentSign = formattedInput.value.includes("-") ? -1 : 1;
        const currentNumeric = currentSign * (parseFloat(currentString) || 0);

        if (currentNumeric !== balance) {
            formattedInput.setValue(formatAmountOfMoney(balance));
        }

        if (balance < 0) setInputColor("text--red");
        else if (balance === 0) setInputColor("text--inactive");
        else setInputColor("text--green");
    }, [balance]);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9.,+\-$]/g, "");
        const sign = raw.includes("-") ? -1 : 1;

        const numericString = raw.replace(/[^0-9.,]/g, "").replace(",", ".");

        if ((numericString.match(/\./g) || []).length > 1) return;

        const parts = numericString.split(".");
        if (parts[1] && parts[1].length > 2) return;

        formattedInput.setValue(raw);

        const numeric = sign * (parseFloat(numericString) || 0);
        setBalance(numeric);
    };

    const onBlur = () => {
        formattedInput.setValue(formatAmountOfMoney(balance));
    };

    const onIncrease = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setBalance(v => round2(v + 1));
    };

    const onDecrease = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setBalance(v => round2(v - 1));
    };

    return (
        <div className="amount-input">
            <button type="button" className="amount-input__btn" onClick={onDecrease}>
                <img src={arrowLeftIcon} alt="Decrease"/>
            </button>
            <input
                type="text"
                className={`input-reset ${inputColor}  text--64`}
                maxLength={10}
                value={formattedInput.value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="+$100"/>
            <button type="button" className="amount-input__btn" onClick={onIncrease}>
                <img src={arrowRightIcon} alt="Increase"/>
            </button>
        </div>
    )
}

export default AmountInput;

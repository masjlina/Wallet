import arrowLeftIcon from "../../../assets/icons/btn-arrow--left.svg";
import arrowRightIcon from "../../../assets/icons/btn-arrow--right.svg";

import "./amountInput.scss";
import useInput from "../../../hooks/useInput";
import {useEffect, useState} from "react";
import {round2} from "../../../services/moneyService";

const AmountInput = ({setBalance}) => {
    const formattedInput = useInput("+$");
    const [rawResult, setRawResult] = useState(0);
    const [inputColor, setInputColor] = useState("text--green");

    useEffect(() => {
        formattedInput.setValue(formatValue(rawResult));
        setBalance(rawResult);

        if (rawResult < 0) setInputColor("text--red");
        else if (rawResult === 0) setInputColor("text--inactive");
        else setInputColor("text--green");
    }, [rawResult]);

    const onChange = (e) => {
        const raw = e.target.value.replace(/[^0-9.,+\-$]/g, "");

        if (/[.,]$/.test(raw)) {
            formattedInput.setValue(raw);
            return;
        }

        const sign = raw[0] === "-" ? -1 : 1;
        const numeric = sign * (
            parseFloat(raw.slice(2).replace(",", ".")) || 0
        );

        setRawResult(numeric);
    };

    const formatValue = (num) => {
        const sign = num < 0 ? "-" : "+";
        const abs = Math.abs(num);
        return `${sign}$${abs}`;
    };

    const onIncrease = (e) => {
        e.preventDefault();
        setRawResult(v => round2(v + 1));
    };

    const onDecrease = (e) => {
        e.preventDefault();
        setRawResult(v => round2(v - 1));
    };

    return (
        <div className="amount-input">
            <button onClick={onDecrease}>
                <img src={arrowLeftIcon} alt="Decrease"/>
            </button>
            <input
                type="text"
                className={`input-reset ${inputColor}  text--64`}
                maxLength={10}
                value={formattedInput.value}
                onChange={onChange}
                placeholder="+$100"/>
            <button onClick={onIncrease}>
                <img src={arrowRightIcon} alt="Increase"/>
            </button>
        </div>
    )
}

export default AmountInput;